import React from 'react';
import Link from 'react-router/lib/Link';

import './home.css';

const Home = () =>
  (
    <div className="main-container">
      <section className="text-center height-80 imagebg" data-overlay="4">
        <div className="background-image-holder">
          <img alt="background" src="/assets/img/landing-21.jpg" />
        </div>
        <div className="container pos-vertical-center">
          <div className="row">
            <div className="col-sm-12">
              <div className="typed-headline">
                <span className="h1 inline-block">Une experience sport-entreprise unique !</span>
              </div>
              <p className="lead">
                Le sport tremplin de la performance en entreprise
              </p>
              <Link className="btn btn--primary type--uppercase" to="/login">
                                <span className="btn__text">
                                  Rejoignez-nous
                                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center bg--secondary">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <h2>Tous les outils dont vous avez besoin</h2>
              <p className="lead">
                Un site imaginé par les sportifs, utile aux entreprises
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg--secondary">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="feature">
                <i className="icon icon-Sidebar-Window color--primary"></i>
                <h4>Une communauté</h4>
                <p>
                  Un ensemble d'outils pour développer votre visibilité et vos opportunités
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature">
                <i className="icon icon-Duplicate-Window color--primary"></i>
                <h4>Fonctionnalités uniques</h4>
                <p>
                  Des services à la carte pour un développement personnalisé
                </p>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature">
                <i className="icon icon-Code-Window color--primary"></i>
                <h4>Pilotez vos performances</h4>
                <p>
                  Des outils d'analyses et de gestion de vos actions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg--primary">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
                <h2>Un gisement de performance pour les entreprises</h2>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-4">
              <div className="feature feature-2 boxed boxed--border">
                <i className="icon icon-Clock-Back color--primary"></i>
                <div className="feature__body">
                  <div>
                    Besoins d'organiser une formation impactante pour mes managers et collaborateurs ?
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature feature-2 boxed boxed--border">
                <i className="icon icon-Duplicate-Window color--primary"></i>
                <div className="feature__body">
                  <div>
                    Besoins de recruter de nouveaux performers ?
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature feature-2 boxed boxed--border">
                <i className="icon icon-Life-Jacket color--primary"></i>
                <div className="feature__body">
                  <div>
                    Besoins de développer ma notoriété et l'image de mon entreprise ?
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row margin-top-15">
            <div className="col-sm-4 col-sm-offset-4">
              <div className="feature feature-2 boxed boxed--border">
                <i className="icon icon-Life-Jacket color--primary"></i>
                <div className="feature__body">
                  <div>
                    Besoins de développer de nouveaux marchés ?
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-center bg--secondary">
        <div className="container">
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2">
              <h2>Et pour vous les sportifs ?</h2>
              <p className="lead">
                Nous avons bien entendu pensez à vous !
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg--secondary">
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                <i className="icon icon--lg icon-Business-ManWoman"></i>
                <h4>Enrichissez votre profil</h4>
                <p>
                  De votre nom, prénom à votre experience professionnelle, vous pourrez tout renseigner
                </p>
                <a href="#">
                  En savoir plus
                </a>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                <i className="icon icon--lg icon-Bicycle"></i>
                <h4>Trouver un sponsor</h4>
                <p>
                  Renseignez les sponsoring dont vous avons besoin pour mener à bien votre carrière
                </p>
                <a href="#">
                  En savoir plus
                </a>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                <i className="icon icon--lg icon-Laptop-3"></i>
                <h4>Valoriser votre parcours</h4>
                <p>
                  Vous voulez des résultats qui vous correspondent ? Réaliser nos tests psychologiques !
                </p>
                <a href="#">
                  En savoir plus
                </a>
                <span className="label">New</span>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                <i className="icon icon--lg icon-Phone-Wifi"></i>
                <h4>Vivez l'entreprise</h4>
                <p>
                  Animer en entreprise la formation de votre choix avec ou développer vos compétences
                </p>
                <a href="#">
                  En savoir plus
                </a>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                <i className="icon icon--lg icon-Beer-Glass"></i>
                <h4>Trouver votre job</h4>
                <p>
                  Créer l'alternance entre votre activité sportive et professionnelle
                </p>
                <a href="#">
                  En savoir plus
                </a>
              </div>
            </div>
            <div className="col-sm-4">
              <div className="feature feature-3 boxed boxed--lg boxed--border text-center">
                <i className="icon icon--lg icon-Coffee-Machine"></i>
                <h4>Voulez-vous que l'on fasse le café en plus ?</h4>
                <p>
                  getAchamp vous promets d'autres belles surprises en perspective.
                </p>
                <a href="#">
                  En savoir plus
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="footer-7 text-center-xs bg--secondary  ">
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
                            <span className="type--fine-print">&copy;
                              <span className="update-year"></span> getAchamp &mdash; Tous droits réservés</span>
            </div>
            <div className="col-sm-6 text-right text-center-xs">
              <ul className="social-list list-inline">
                <li>
                  <a href="#">
                    <i className="socicon socicon-google icon icon--xs"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="socicon socicon-twitter icon icon--xs"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="socicon socicon-facebook icon icon--xs"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="socicon socicon-instagram icon icon--xs"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

        </div>

      </footer>
    </div>
    );

export default Home;
