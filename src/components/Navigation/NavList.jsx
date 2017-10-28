import React from "react";
import FontIcon from "react-md/lib/FontIcons";
import Link from "gatsby-link";

const _ = require("lodash");

function GetNavList(config, contentList) {
  const NavList = [
    {
      primaryText: "Home",
      leftIcon: <FontIcon>home</FontIcon>,
      component: Link,
      to: "/"
    },
    {
      divider: true
    }
  ];

  if (contentList) {
    contentList.forEach(content => {
      if(content.node.relativePath === "" || content.node.relativeDirectory !== "" || content.node.name === "guides") {
        return;
      }
      const label = _.startCase(content.node.name.replace("-", " "));
      if(content.node)
      NavList.push({
        primaryText: label,
        leftIcon: null,
        component: Link,
        href: `/${content.node.relativePath}/`
      })
    })
  }

  NavList.push({ divider: true })

  if (config.userLinks) {
    config.userLinks.forEach(link => {
      NavList.push({
        primaryText: link.label,
        leftIcon: <FontIcon forceSize iconClassName={link.iconClassName} />,
        component: "a",
        href: link.url
      });
    });
  }

  NavList.push({ divider: true });
  NavList.push({
    primaryText: "Contribute",
    leftIcon: <FontIcon>extension</FontIcon>,
    component: Link,
    to: "/guides/"
  });
  NavList.push({
    primaryText: "About",
    leftIcon: <FontIcon>person</FontIcon>,
    component: Link,
    to: "/about/"
  });
  return NavList;
}
export default GetNavList;
