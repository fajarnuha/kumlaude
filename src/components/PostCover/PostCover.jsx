import React, { Component } from "react";
import "./PostCover.scss";

class PostCover extends Component {
  render() {
    const { postNode, mobile } = this.props;
    let post = postNode.frontmatter.cover;
    /* eslint no-undef: "off"*/
    if (!post) post = "https://picsum.photos/400/300/?random";
    const cover = post.startsWith("/")
      ? __PATH_PREFIX__ + post
      : post;
    const coverHeight = mobile ? 180 : 350;
    return (
      <div
        style={{ backgroundImage: `url(${cover})`, height: `${coverHeight}px` }}
        className="md-grid md-cell--9 post-cover"
      />
    );
  }
}

export default PostCover;
