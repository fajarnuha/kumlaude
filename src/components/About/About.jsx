import React, { Component } from "react";
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import UserLinks from "../UserLinks/UserLinks";
import config from "../../../data/SiteConfig";
import "./About.scss";

class About extends Component {
  render() {
    return (
      <div className="about-container md-grid mobile-fix">
        <Card className="md-grid md-cell--8">
          <div className="about-wrapper">
            <CardTitle title="Kumlaude" subtitle="Your weapon to become S.Kom. cumlaude" />
            <CardText>
              <p className="about-text md-body-1">
                {config.userDescription}
              </p>
            </CardText>
            <UserLinks labeled config={config} />
          </div>
        </Card>
      </div>
    );
  }
}

export default About;
