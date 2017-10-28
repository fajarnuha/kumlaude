import React, { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";
import { Card } from "react-md";
import config from "../../data/SiteConfig";
import Persona from "../components/Persona/Persona"
import "./about.scss"

class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contribs: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.github.com/repos/fajarnuha/kumlaude/contributors?page=1&per_page=12`)
      .then(res => {
        console.log(res.data)
        const contribs = res.data;
        this.setState({ contribs });
      });
  }

  render() {
    return (
      <div className="about-container">
        <Helmet>
          <title>{`About | ${config.siteTitle}`}</title>
          <link rel="canonical" href={`${config.siteUrl}/about/`} />
        </Helmet>
        <br />
        <div className="grid-example mobile-fix">
          <Card>
            <div className="text-container">
              <p className="mission-text">&quot;Our mission is to make cumlaude as worthless as ever. We will disrupt our education system and make learning great again.&quot;</p>
            </div>
          </Card>
        </div>
        <br />
        <Persona title="Developers" heroes={config.developers} />
        <br />
        <Persona title="Top Contributors" heroes={this.state.contribs} />
      </div>
    );
  }
}

export default AboutPage;
