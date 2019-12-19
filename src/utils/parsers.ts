import fetch from "node-fetch";
import { JSDOM } from "jsdom";

async function getHTML(url: string) {
  const res = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json; charset=UTF-8" }
  });
  const body = await res.text();
  return body;
}

const parseVideos = (html: string) => {
  const { document } = new JSDOM(html).window;
  const videoItems = document.querySelectorAll("#content .thumb-block");
  Array.from(videoItems).map((el, index) => {
    const link = <HTMLAnchorElement>el.querySelector(".thumb-under a");
    return {
      index,
      text: link?.innerText?.substr(0, 30) || "",
      href: link?.href || ""
    };
  });
};

const parseTags = (html: string) => {
  const { document } = new JSDOM(html).window;
  const tags = Array.from(document.querySelectorAll(".video-tags-list li"));
  return tags.map((tag: HTMLDataListElement) => tag.innerText).slice(0, 5);
};

const pageTagCrawler = async (urlStr: string) => {
  let body = await getHTML(urlStr);
  let taglist = parseTags(body);
  return taglist;
};

const pageVideoCrawler = async (urlStr: string) => {
  const html = await getHTML(urlStr);
  return parseVideos(html);
};

export default { pageTagCrawler, pageVideoCrawler };
