import React, { Component } from "react";
import { Card, CardTitle, CardText } from 'react-md/lib/Cards';
import Link from "gatsby-link";
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
                Website ini memberikan segala informasi yang harapannya akan membantu kamu untuk menjadi cumlaude ilmu komputer. 
                Informasi yang ada di website ini adalah kumpulan kontribusi mahasiswa-mahasiswa ilmu komputer yang dievaluasi oleh orang-orang terpercaya. 
                Secara umum website ini memberikan informasi berdasarkan mata kuliah yang ada di ilkomp, di dalamnya, terdapat catatan, uts, uas, dan mungkin tips-tips terselubung!. 
                Selamat belajar!
              </p>
              <h3>Contribute</h3>
              <p>
                Website ini beserta konten-konten nya adalah open source. Semua orang bisa berkontribusi untuk membuat website ini lebih bermanfaat. See contribution guide <Link to={"/guides"}>here.</Link>
              </p>
            </CardText>
          </div>
        </Card>
      </div>
    );
  }
}

export default About;
