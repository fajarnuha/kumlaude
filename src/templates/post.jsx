import React from "react";
import Helmet from "react-helmet";
import Card from "react-md/lib/Cards";
import CardText from "react-md/lib/Cards/CardText";
import PostCover from "../components/PostCover/PostCover";
import PostInfo from "../components/PostInfo/PostInfo";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./post.scss";

export default class PostTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: true
    };
    this.handleResize = this.handleResize.bind(this);
  }
  componentDidMount() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    if (window.innerWidth >= 640) {
      this.setState({ mobile: false });
    } else {
      this.setState({ mobile: true });
    }
  }

  render() {
    const { mobile } = this.state;
    const { slug } = this.props.pathContext;
    const postOverlapClass = mobile ? "post-overlap-mobile" : "post-overlap";
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    const dir = this.props.data.allDirectory
    const file = this.props.data.allFile
    const childFile = file ? file.edges : null
    const childDir = dir ? dir.edges : null
    if (!post.id) {
      post.id = slug;
    }
    if (!post.id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <div className="post-page md-grid md-grid--no-spacing">
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}${post.id}`} />
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <PostCover postNode={postNode} mobile={mobile} />
        <div
          className={`md-grid md-cell--9 post-page-contents mobile-fix ${postOverlapClass}`}
        >
          <Card className="md-grid md-cell md-cell--12 post">
            <CardText className="post-body">
              <h1 className="md-display-2 post-header">
                {post.title}
              </h1>
              <PostInfo postNode={postNode} childDir={childDir} childFile={childFile} />
              <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            </CardText>
            <div className="post-meta">
              <SocialLinks
                postPath={slug}
                postNode={postNode}
                mobile={this.state.mobile}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}

/* eslint no-undef: "off"*/
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!, $slugTrim: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt
      frontmatter {
        title
        cover
        date
        category
        tags
      }
      fields {
        nextTitle
        nextSlug
        prevTitle
        prevSlug
        slug
        modifiedTime
      }
    }
  allDirectory (filter: {relativeDirectory: {eq : $slugTrim }}){
    edges {
      node {
        name
        relativeDirectory
      }
    }
  }
  allFile (filter: {relativeDirectory: {eq : $slugTrim }, name: {ne: "index"}, ext: {eq: ".md"}}){
    edges {
      node {
        name
        relativeDirectory
      }
    }
  }
  }
`;
