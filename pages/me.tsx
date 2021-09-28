import styles from "../components/Admin.module.scss";

import {useEffect, useMemo, useState} from "react";
import { useRouter } from "next/router";

import toast from "react-hot-toast";
import { addPost, getPostsForUser } from "../lib/db";
import {Post, PostCategory} from "../graphql/generated/types";
import {Loader} from "../components/Loader";

export default function AdminPostsPage() {
  return (
    <main>
        <PostList />
        <CreateNewPost />
    </main>
  );
}

function PostList() {
  const [posts, setPosts] = useState<Post[]>()

  if (!posts) {
    return <Loader show={true} />
  }

  return (
    <>
      <h1>Manage your Posts</h1>
    </>
  );
}

function CreateNewPost() {
  const router = useRouter();
  const [title, setTitle] = useState("");

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  const createPost = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.success("Post created!");
  };

  return (
    <form onSubmit={createPost}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Tittel"
        className={styles.input}
      />
      <button type="submit" disabled={!isValid} className="btn-green">
        Lag ny post
      </button>
    </form>
  );
}
