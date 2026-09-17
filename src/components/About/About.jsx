function About() {
  return (
    <main className="about">
      <section className="about__intro">
        <p className="about__eyebrow">Sobre a Caixa</p>

        <h1 className="about__title">
          Quando o sonho fala,
          <br />o símbolo escuta.
        </h1>

        <p className="about__subtitle">
          Explore os sentidos que podem surgir dessa conversa.
        </p>
      </section>

      <section className="about__section">
        <h2 className="about__heading">Por que símbolos?</h2>

        <p className="about__text">
          Sonhos são feitos de imagens, situações, pessoas, lugares e sensações
          que nem sempre fazem sentido quando acordamos. Um animal, uma estação
          de trem ou uma bicicleta podem aparecer de maneiras muito diferentes
          para cada pessoa.
        </p>

        <p className="about__text">
          A Caixa de Morfeu reúne referências simbólicas para servir como ponto
          de partida para a sua própria investigação. Crie seu dicionário!
          Descubra o que cada símbolo quer dizer para você, dentro da sua
          história.
        </p>
      </section>

      <section className="about__section">
        <h2 className="about__heading">Como funciona?</h2>

        <div className="about__steps">
          <article className="about__step">
            <span className="about__step-number">01</span>
            <h3 className="about__step-title">Encontre</h3>
            <p className="about__text">
              Digite o símbolo que apareceu no seu sonho.
            </p>
          </article>

          <article className="about__step">
            <span className="about__step-number">02</span>
            <h3 className="about__step-title">Explore</h3>
            <p className="about__text">
              Consulte referências e diferentes possibilidades de significado.
            </p>
          </article>

          <article className="about__step">
            <span className="about__step-number">03</span>
            <h3 className="about__step-title">Relacione</h3>
            <p className="about__text">
              Observe e registre o que aquele símbolo desperta em você.
            </p>
          </article>
        </div>
      </section>

      <section className="about__section">
        <h2 className="about__heading">
          Uma ferramenta para transformar
          <br />
          símbolos em perguntas.
        </h2>

        <p className="about__text">
          Os resultados apresentados pela Caixa de Morfeu reúnem referências
          simbólicas de diferentes perspectivas e tradições.
        </p>

        <p className="about__text">
          Essas referências não constituem diagnóstico, previsão ou
          interpretação definitiva de um sonho, mas sim possibilidades de
          leitura para você relacionar com a sua própria experiência.
        </p>
      </section>

      <section className="about__closing">
        <p className="about__closing-text">
          Símbolos são como portas
          <br />e seu sonho te convida a entrar.
        </p>

        <a className="about__link" href="/simbolos">
          Explorar símbolos
        </a>
      </section>
    </main>
  );
}

export default About;
