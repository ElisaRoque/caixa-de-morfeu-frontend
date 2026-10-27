import { useState } from "react";
import "../../blocks/login.css";

const validateEmail = (email) => {
  if (!email.trim()) {
    return "O e-mail é obrigatório.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Digite um e-mail válido.";
  }

  return "";
};

const Login = ({ handleLogin, onSwitchAuthModal }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setServerError("");

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: value.trim() ? validateEmail(value) : "",
      }));
    }

    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.trim() ? "" : "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));

    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value),
      }));
    }

    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: value.trim() ? "" : "A senha é obrigatória.",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emailError = validateEmail(data.email);
    const passwordError = data.password.trim() ? "" : "A senha é obrigatória.";

    setTouched({
      email: true,
      password: true,
    });

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError) {
      return;
    }

    setServerError("");
    setIsSubmitting(true);

    handleLogin(data.email, data.password)
      .catch(() => {
        setServerError("E-mail ou senha incorretos.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="login">
      <p className="login__welcome">Entrar</p>

      <form className="login__form" onSubmit={handleSubmit} noValidate>
        <input
          id="email"
          name="email"
          placeholder="E-mail"
          type="email"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="email"
          aria-invalid={Boolean(touched.email && errors.email)}
          aria-describedby="email-error"
        />

        {touched.email && errors.email && (
          <p className="login__error" id="email-error">
            {errors.email}
          </p>
        )}

        <input
          id="password"
          name="password"
          placeholder="Senha"
          type="password"
          value={data.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="current-password"
          aria-invalid={Boolean(touched.password && errors.password)}
          aria-describedby="password-error"
        />

        {touched.password && errors.password && (
          <p className="login__error" id="password-error">
            {errors.password}
          </p>
        )}

        {serverError && (
          <p className="login__error" role="alert">
            {serverError}
          </p>
        )}

        <div className="login__button-container">
          <button type="submit" className="login__link" disabled={isSubmitting}>
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </div>
      </form>

      <div className="login__signup">
        <button
          type="button"
          className="signup__link"
          onClick={() => onSwitchAuthModal("register")}
        >
          Ainda não é membro? Inscreva-se aqui!
        </button>
      </div>
    </div>
  );
};

export default Login;
