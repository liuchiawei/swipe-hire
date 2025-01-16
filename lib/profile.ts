import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

/**
 * 取得所有文章的資料
 * @returns
 */
export function getSortedPostsData() {
  // 拿取 /posts 資料夾中的所有檔案名稱
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // 移除名稱中的 ".md"，並將它當作 id
    const id = fileName.replace(/\.md$/, "");

    // 將 markdown 內容轉換為字串
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // 使用 gray-matter 解析 metadata 區塊
    const matterResult = matter(fileContents);

    // 將資料與 id 結合
    return {
      id,
      ...matterResult.data,
    };
  });
  // 依照日期排序
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 查詢外部API
// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from an external API endpoint
//   const res = await fetch('..');
//   return res.json();
// }

// 查詢外部資料庫
// import someDatabaseSDK from 'someDatabaseSDK'
// const databaseClient = someDatabaseSDK.createClient(...)

// export async function getSortedPostsData() {
//   // Instead of the file system,
//   // fetch post data from a database
//   return databaseClient.query('SELECT posts...')
// }

/**
 * 取得所有文章的 id
 * @returns
 */
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  // 重點: 回傳的清單內容不僅僅是字串的陣列 — 它還必須是一個物件的陣列，每個物件必須包含 params 的鍵，並且值為包含 id 鍵（因為我們在檔案名稱使用 [id]） 的物件。 不這麼做的話，getStaticPaths 會無法起到它的作用。
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}
// export async function getAllPostIds() {
//   // Instead of the file system,
//   // fetch post data from an external API endpoint
//   const res = await fetch('..');
//   const posts = await res.json();
//   return posts.map((post) => {
//     return {
//       params: {
//         id: post.id,
//       },
//     };
//   });
// }

/**
 * 取得單一篇文章的資料(by id)
 * @param {*} id
 * @returns
 */
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
