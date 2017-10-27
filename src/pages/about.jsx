import React, { Component } from "react";
import Helmet from "react-helmet";
import axios from "axios";
import { Card, CardTitle, Avatar, Grid, Cell, Paper } from "react-md";
import config from "../../data/SiteConfig";
import "./about.scss"

class AboutPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contribs: []
    };
  }

  componentDidMount() {
    axios.get(`https://api.github.com/repos/freeCodeCamp/guides/contributors?page=1&per_page=12`)
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
            <CardTitle title="Hello" />
          </Card>
        </div>
        <br />
        <div className="grid-example">
          <Card>
            <div className="md-grid">
              {this.state.contribs.map((i) => 
                (<Cell key={i.id} size={4}>
                  <Avatar className="avatar-img" src={i.avatar_url} />
                  <div className="prof-info">
                    <p>{i.login}</p>
                    <p>{i.contributions}</p>
                  </div>
                </Cell>)
                )}
            </div>
          </Card>
        </div>
        {/* <div className="md-grid contrib-container">
          {[1,2,3,4].map((x,i)=>
            (<Card className="md-cell md-cell--2">
              <CardTitle
                title="fajarnuha"
                subtitle={`${x} commit`}
                avatar={<Avatar src="https://avatars0.githubusercontent.com/u/15099703?s=460&v=4" role="presentation" />} />
            </Card>)
          )}
        </div> */}
      </div>
    );
  }
}

export default AboutPage;
