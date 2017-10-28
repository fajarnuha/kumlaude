import React, { Component } from "react";
import CardTitle from "react-md/lib/Cards/CardTitle";
import Avatar from "react-md/lib/Avatars";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";
import _ from "lodash";
import "./PostInfo.scss";

class PostInfo extends Component {
  render() {
    const { postNode, childDir, childFile } = this.props;
    return (
      <div className="post-info">
        <CardTitle
          avatar={<Avatar icon={<FontIcon iconClassName="fa fa-calendar" />} />}
          title={`Last modified on ${postNode.fields.modifiedTime}`}
          subtitle={`${postNode.timeToRead} min read`}
        />
        {childDir ? 
          childDir.map(dir => 
            (<Link
              className="category-link"
              to={`/${dir.node.relativeDirectory  }/${  dir.node.name}`}
            >
              <CardTitle
                avatar={
                  <Avatar icon={<FontIcon iconClassName="fa fa-folder-open" />} />
                }
                title={"Browse for"}
                subtitle={dir.node.name}
              />
            </Link>)
          )
        : null}
        {childFile ? 
          childFile.map(file=>
            (<Link
              className="category-link"
              to={`/${file.node.relativeDirectory  }/${  file.node.name}`}
            >
              <CardTitle
                avatar={
                  <Avatar icon={<FontIcon iconClassName="fa fa-book" />} />
                }
                title={file.node.name}
              />
            </Link>
            )
          )
        : null}
      </div>
    );
  }
}

export default PostInfo;
