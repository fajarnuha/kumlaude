const path = require("path");
const webpackLodashPlugin = require("lodash-webpack-plugin");

const postNodes = [];

function addSibilingNodes(boundActionCreators) {
  const { createNodeField } = boundActionCreators;
  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0;
    const prevID = i - 1 > 0 ? i - 1 : postNodes.length - 1;
    const currNode = postNodes[i];
    const nextNode = postNodes[nextID];
    const prevNode = postNodes[prevID];
    createNodeField({
      node: currNode,
      name: "nextTitle",
      value: nextNode.frontmatter.title
    });
    createNodeField({
      node: currNode,
      name: "nextSlug",
      value: nextNode.fields.slug
    });
    createNodeField({
      node: currNode,
      name: "prevTitle",
      value: prevNode.frontmatter.title
    });
    createNodeField({
      node: currNode,
      name: "prevSlug",
      value: prevNode.fields.slug
    });
  }
}

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const { dir, name } = path.parse(fileNode.relativePath);
    const d = new Date(fileNode.modifiedTime);
    const modifiedTime = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}, ${d.getHours()}:${d.getMinutes()}`;
    if (name !== 'index' && dir !== '') {
      slug = `/${dir}/${name}/`;
    } else if (dir === '') {
      slug = `/${name}/`;
    } else {
      slug = `/${dir}/`;
    }
    createNodeField({ node, name: "slug", value: slug });
    createNodeField({ node, name: "modifiedTime", value: modifiedTime})
    postNodes.push(node);
  }

  addSibilingNodes(boundActionCreators);
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;

  return new Promise((resolve, reject) => {
    const postPage = path.resolve("src/templates/post.jsx");
    resolve(
      graphql(
        `
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          /* eslint no-console: "off" */
          console.log(result.errors);
          reject(result.errors);
        }

        result.data.allMarkdownRemark.edges.forEach(edge => {
          createPage({
            path: edge.node.fields.slug,
            component: postPage,
            context: {
              slug: edge.node.fields.slug,
              slugTrim: edge.node.fields.slug.slice(1,-1)
            }
          });
        });
      })
    );
  });
};

exports.modifyWebpackConfig = ({ config, stage }) => {
  if (stage === "build-javascript") {
    config.plugin("Lodash", webpackLodashPlugin, null);
  }
};
