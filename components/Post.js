import Image from "next/image";
import { ChatAltIcon, ShareIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AnimatePresence, motion } from "framer-motion";

function Post({ id, name, message, email, postImage, image, timestamp }) {
  const { data: session } = useSession();
  const sessionGuest = {
    user: {
      image:
        "https://firebasestorage.googleapis.com/v0/b/socify-a7183.appspot.com/o/GuestImage.jpeg?alt=media&token=1599552c-3813-43eb-8807-302dce19ef52",
      name: "Guest",
      uid: "123456789",
    },
  };
  let [addCommentWindow, setAddCommentWindow] = useState(false);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState();

  const [allComments, setAllComments] = useState([]);
  const [commentSize, setCommentSize] = useState(3);
  const [showMore, setShowMore] = useState(true);

  const [showImpressions, setShowImpressions] = useState(false);

  const addCommentRef = useRef();

  // Open/Close add comment section
  const toggleCommentWindow = async () => {
    await setAddCommentWindow(!addCommentWindow);
    if (!addCommentWindow === true) {
      addCommentRef.current.focus();
    }
  };

  // Comment handling
  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => (
          setComments(snapshot.docs.slice(0, commentSize)),
          setAllComments(snapshot.docs)
        )
      ),
    [db, commentSize]
  );

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");
    setAddCommentWindow(false);

    session &&
      (await addDoc(collection(db, "posts", id, "comments"), {
        comment: commentToSend,
        userName: session.user.name,
        userImage: session.user.image,
        timestamp: serverTimestamp(),
      }));
  };

  // Show impression only if Likes > 0 or Comments > 0
  useEffect(() => {
    if (likes.length > 0 || allComments.length > 0) {
      setShowImpressions(true);
    } else if (likes.length === 0 && allComments.length === 0) {
      setShowImpressions(false);
    }
  }, [likes, allComments]);

  // Likes handling
  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      session &&
      setHasLiked(
        likes.findIndex((like) => like.id === session.user.uid) !== -1
      ),
    [likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      session &&
        (await deleteDoc(doc(db, "posts", id, "likes", session.user.uid)));
    } else {
      session &&
        (await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
          name: session.user.name,
        }));
    }
  };

  const currentDate = new Date();
  const postDate = new Date(timestamp?.toDate());

  const msDifference = currentDate.getTime() - postDate.getTime();
  let timePast = Math.floor(msDifference / 1000);
  let postTime = getTimestamp(timePast);

  // Convert timestamp to timesince
  function getTimestamp(timeSince) {
    if (timeSince < 60) {
      postTime = "Just now";
    } else if (timeSince >= 60 && timeSince < 3600) {
      timeSince = Math.floor(timeSince / 60);
      postTime = timeSince + (timeSince > 1 ? " minutes ago" : " minute ago");
    } else if (timeSince >= 3600 && timeSince < 86400) {
      timeSince = Math.floor(timeSince / 60 / 60);
      postTime = timeSince + (timeSince > 1 ? " hours ago" : " hour ago");
    } else if (timeSince >= 86400 && timeSince < 604800) {
      timeSince = Math.floor(timeSince / 60 / 60 / 24);
      postTime = timeSince + (timeSince > 1 ? " days ago" : " day ago");
    } else if (timeSince >= 604800 && timeSince < 2628000) {
      timeSince = Math.floor(timeSince / 60 / 60 / 24 / 7);
      postTime = timeSince + (timeSince > 1 ? " weeks ago" : " week ago");
    } else if (timeSince >= 2628000 && timeSince < 31540000) {
      timeSince = Math.floor(timeSince / 60 / 60 / 24 / 7 / 4.34524);
      postTime = timeSince + (timeSince > 1 ? " months ago" : " month ago");
    } else if (timeSince >= 31540000) {
      timeSince = Math.floor(timeSince / 60 / 60 / 24 / 7 / 4.34524 / 12);
      postTime = timeSince + (timeSince > 1 ? " years ago" : " year ago");
    }
    return postTime;
  }

  // Update timestamp to timesince on comments
  function setCommentTimeSince(timestamp) {
    const currentDate = new Date();
    const commentDate = new Date(timestamp?.toDate());
    const timeDifference = currentDate.getTime() - commentDate.getTime();
    const timeSince = Math.floor(timeDifference / 1000);
    return getTimestamp(timeSince);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col"
    >
      {/* Profile Image, Timesince, and Caption */}
      <div className="p-4 bg-gray-800 mt-5 rounded-t-2xl shadow-sm">
        <div className="flex items-center space-x-2">
          <img
            className="rounded-full"
            src={image}
            width={40}
            height={40}
            alt=""
          />
          <div>
            <p className="font-medium text-gray-300">{name}</p>

            <p className="text-xs text-gray-500 mt-1">{postTime}</p>
          </div>
        </div>

        <p className="pt-4 sm:ml-12 text-gray-300">{message}</p>
      </div>

      {/* Post Image */}
      {postImage && (
        <div className="bg-gray-800">
          <div className="relative h-[30rem] md:96 ml-4 sm:ml-16 mr-4 mb-2 bg-gray-800">
            <Image
              className="rounded-2xl"
              src={postImage}
              objectFit="cover"
              layout="fill"
            />
          </div>
        </div>
      )}

      {/* Post impressions */}
      {showImpressions && (
        <div className="bg-gray-800">
          <div className="bg-gray-800 flex flex-col space-x-3 py-2 ml-4 sm:ml-16 mr-4 border-t border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <p className="text-xs flex-1 text-gray-500">
                {likes.length > 0
                  ? likes.length === 1
                    ? likes.length + " Like"
                    : likes.length + " Likes"
                  : ""}{" "}
                {allComments.length > 0
                  ? allComments.length === 1
                    ? allComments.length + " Comment"
                    : allComments.length + " Comments"
                  : ""}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Like, Comment, and Share buttons */}
      <div className="rounded-b-2xl bg-gray-800 shadow-md pb-3 pt-2">
        <div className="flex justify-between items-center  text-gray-50 ml-4 sm:ml-16 mr-4">
          <div onClick={likePost} className="postIcon">
            {!hasLiked ? (
              <ThumbUpIcon className="h-4" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-red-500"
                viewBox="0 0 20 20"
              >
                <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
              </svg>
            )}

            <p className={`text-xs ${hasLiked ? "text-red-500" : ""}`}>Like</p>
          </div>
          <div onClick={toggleCommentWindow} className="postIcon ml-2 mr-2">
            <ChatAltIcon className="h-4" />
            <p className="text-xs">Comment</p>
          </div>
          <div className=" postIcon">
            <ShareIcon className="h-4" />
            <p className="text-xs">Share</p>
          </div>
        </div>

        {/* Add comment section */}
        <AnimatePresence>
          {addCommentWindow && (
            <motion.div
              key="addacomment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
              className="flex space-x-2 p-4 items-center sm:ml-12"
            >
              <Image
                className="rounded-full"
                src={session ? session.user.image : sessionGuest.user.image}
                width={40}
                height={40}
                layout="fixed"
              />
              <form className="flex flex-1">
                <input
                  ref={addCommentRef}
                  onChange={(e) => setComment(e.target.value)}
                  className="rounded-full h-12 text-gray-300 bg-gray-700 flex-grow px-5 focus:outline-none"
                  type="text"
                  placeholder="Write a comment"
                />
                <button
                  disabled={!comment}
                  onClick={sendComment}
                  hidden
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Display comments section */}
        {comments.length > 0 && (
          <div className="flex flex-col ml-4 sm:ml-20 mt-4">
            {comments.map((comment) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                key={comment.id}
                className="flex items-center space-x-2 mb-3"
              >
                <img
                  className="h-7 rounded-full"
                  src={comment.data().userImage}
                  alt="userpic"
                />
                <div className="flex flex-col flex-1 py-2 px-3 rounded-2xl bg-gray-700">
                  <p className="text-xs text-gray-300 font-bold">
                    {comment.data().userName}
                  </p>
                  <p className="text-gray-300 text-sm font-light">
                    {comment.data().comment}
                  </p>
                </div>
                <p className="pr-5 text-xs text-gray-500">
                  {setCommentTimeSince(comment.data().timestamp)}
                </p>
              </motion.div>
            ))}
            {allComments.length > 3 &&
              allComments.length > commentSize &&
              allComments.length !== commentSize && (
                <p
                  onClick={() => setCommentSize(commentSize + 3)}
                  className="flex text-gray-300 cursor-pointer hover:text-blue-500 text-xs justify-center"
                >
                  Show More
                </p>
              )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default Post;
