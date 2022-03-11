import { useSession } from "next-auth/react";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/solid";
import { Fragment, useRef, useState } from "react";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { Backdrop, CircularProgress, Tooltip, Zoom } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";

function InputBox() {
  const { data: session } = useSession();
  const sessionGuest = {
    user: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/socify-a7183.appspot.com/o/GuestImage.jpeg?alt=media&token=1599552c-3813-43eb-8807-302dce19ef52",
      name: "Guest",
    },
  };
  const inputRef = useRef(null);
  const filepickerRef = useRef(null);
  const [imageToPost, setImageToPost] = useState(null);
  const [loading, setLoading] = useState(false);

  // Send post to database
  const sendPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!inputRef.current.value) return;

    const docRef =
      session &&
      (await addDoc(collection(db, "posts"), {
        message: inputRef.current.value,
        name: session ? session.user.name : sessionGuest.user.name,
        email: session.user.email,
        image: session.user.image,
        timestamp: serverTimestamp(),
      }));

    if (imageToPost != null && session) {
      const imageRef = ref(storage, `posts/${docRef.id}/image`);

      await uploadString(imageRef, imageToPost, "data_url").then(
        async (snapshot) => {
          const downloadURL = await getDownloadURL(imageRef);
          await updateDoc(doc(db, "posts", docRef.id), {
            postImage: downloadURL,
          });
        }
      );
    }
    removeImage();
    inputRef.current.value = "";
    setLoading(false);
  };

  // Set image to be sent to database
  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent) => {
      setImageToPost(readerEvent.target.result);
    };
    setFocus();
  };

  // After adding a photo,
  // set focus back to input if there are 1 or more characters
  const setFocus = () => {
    inputRef.current.value.length > 0 && inputRef.current.focus();
  };

  // Remove image from state
  const removeImage = () => {
    setImageToPost(null);
    inputRef.current.value.length > 0 && inputRef.current.focus();
  };

  return (
    <div className="bg-gray-800 p-2 rounded-2xl shadow-md text-gray-400 font-medium">
      {/* Input form */}
      <div className="flex space-x-4 p-4 items-center">
        <Image
          className="rounded-full"
          src={session ? session.user.image : sessionGuest.user.image}
          width={40}
          height={40}
          layout="fixed"
        />
        <form className="flex flex-1">
          <input
            className="rounded-full h-12 bg-gray-700 flex-grow px-5 focus:outline-none"
            type="text"
            ref={inputRef}
            placeholder={
              session
                ? `What's new, ${session.user.name.split(" ")[0]}?`
                : "What's new, Guest?"
            }
          />
          <button hidden type="submit" onClick={sendPost}>
            Submit
          </button>
        </form>
        {imageToPost && (
          <div
            onClick={removeImage}
            className="flex flex-col filter hover:brightness-110 transition duration-150 transform hover:scale-105 cursor-pointer"
          >
            <img className="h-10 object-contain" src={imageToPost} alt="" />
            <p className="text-xs text-red-500 text-center">Remove</p>
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-evenly p-3">
        <div className="inputIcon rounded-full border-2 border-slate-700 hover:bg-gray-700 hover:text-gray-300">
          <VideoCameraIcon className="h-7 text-red-500" />
          <p className="text-xs sm:text-sm xl:text-md">Live Video</p>
        </div>

        <div
          onClick={() => filepickerRef.current.click()}
          className="inputIcon rounded-full border-2 border-slate-700 hover:bg-gray-700 hover:text-gray-300 ml-2 mr-2"
        >
          <CameraIcon className="h-7 text-green-400" />
          <p className="text-xs sm:text-sm xl:tex-md">Photo</p>
          <input
            ref={filepickerRef}
            onChange={addImageToPost}
            type="file"
            hidden
          />
        </div>

        <div className="inputIcon  rounded-full border-2 border-slate-700 hover:bg-gray-700 hover:text-gray-300">
          <EmojiHappyIcon className="h-7 text-yellow-300" />
          <p className="text-xs sm:text-sm xl:text-md">Feeling/Activity</p>
        </div>
      </div>

      {/* Sending post modal */}
      <div>
        <Transition appear show={loading} as={Fragment}>
          <Dialog
            open={loading}
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={() => setLoading(true)}
          >
            <div className="min-h-screen px-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0" />
              </Transition.Child>
              <span
                className="inline-block h-screen align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: 100,
                  }}
                  open={loading}
                  onClick={() => setLoading(true)}
                >
                  <div className="inline-block w-full max-w-xs p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-gray-700 shadow-xl rounded-2xl">
                    <Dialog.Title
                      as="h3"
                      className=" flex text-lg font-medium leading-6 text-gray-50 justify-center"
                    >
                      Posting
                    </Dialog.Title>
                    <div className="mt-4 flex justify-center">
                      <CircularProgress />
                    </div>
                  </div>
                </Backdrop>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    </div>
  );
}

export default InputBox;
