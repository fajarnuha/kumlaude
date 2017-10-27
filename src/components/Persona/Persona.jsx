import React, { Component } from "react";
import { Card, CardTitle, Cell } from "react-md";
import "./Persona.scss";

class PostCover extends Component {
    render() {
        const { title, heroes } = this.props;
        return (
          <div className="grid-example">
            <Card>
              <CardTitle title={title} />
              <div className="md-grid">
                {heroes.map((i) => 
                (<Cell key={i.id} size={4} phoneSize={2}>
                  <a href={i.html_url} target="_blank">
                    <img className="avatar-img" alt="" src={i.avatar_url} />
                    <div className="prof-info">
                      <h4>{i.login}<br />{title === "Developers" ? i.contributions : `${i.contributions} contributions`}</h4>
                    </div>
                  </a>
                </Cell>)
                )}
              </div>
            </Card>
          </div>)
    }
}

export default PostCover;