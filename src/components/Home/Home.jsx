import React, { Component } from "react";
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import { Media } from 'react-md/lib'
import Link from "gatsby-link";
import "./Home.scss";


class About extends Component {
  render() {
    return (
      <div className="about-container md-grid mobile-fix">
        <Card className="md-grid md-cell--6">
          <div className="about-wrapper">
            <CardTitle title="Kumlaude" subtitle="Kumpulan materi open source Ilmu Komputer" />
            <CardText>
              <Media style={{maxWidth: 600}}>
                <img alt="cumlaude" src="img/cumlaude.jpg" />
              </Media> 
              <p className="about-text md-body-1">
                Website ini memberikan segala informasi yang harapannya akan membantu mahasiswa ilkomp untuk meraih gelar cumlaude ilmu komputer. 
                Informasi yang ada di website ini adalah kumpulan kontribusi mahasiswa-mahasiswa ilmu komputer yang dievaluasi oleh orang-orang terpercaya. 
                Secara umum website ini memberikan informasi berdasarkan mata kuliah yang ada di ilkomp, seperti: 
              </p>
              <ul>
                <li>Catatan</li>
                <li>UTS</li>
                <li>UAS</li>
                <li>Materi</li>
                <li>Tips-tips terselubung</li>
                <li>dll</li>
              </ul>
              <h3>Contribute</h3>
              <p>
                Kumlaude beserta konten-konten nya adalah <a href="https://en.wikipedia.org/wiki/Open-source_model">open source. </a>
                Semua orang bisa berkontribusi untuk membuat website ini lebih bermanfaat. 
                See contribution guide <Link to={"/guides"}>here.</Link>
              </p>
            </CardText>
          </div>
        </Card>
      </div>
    );
  }
}

export default About;
