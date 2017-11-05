import React from "react";
import Helmet from "react-helmet";
import PostListing from "../components/PostListing/PostListing";
import config from "../../data/SiteConfig";
import Home from "../components/Home/Home";

class Index extends React.Component {
  render() {
    const postEdges = this.props.data.allMarkdownRemark.edges;
    return (
      <div className="index-container">
        <Helmet>
          <title>{config.siteTitle}</title>
          <link rel="canonical" href={`${config.siteUrl}`} />
        </Helmet>
        <Home />
        <PostListing postEdges={postEdges} />
      </div>
    );
  }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(limit: 3, sort: {fields: [fields___modifiedTime], order: DESC}) {
      edges {
        node {
          fields {
            slug
            modifiedTime
          }
          excerpt
          timeToRead
          frontmatter {
            title
            cover
          }
        }
      }
    }
  }
`;
