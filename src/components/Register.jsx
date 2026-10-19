import { useState } from "react";
import "../../blocks/register.css";

const validateEmail = (email) => {
  if (!email.trim()) {
    return "O e-mail é obrigatório.";
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Digite um e-mail válido.";
  }

  return "";
};

const validatePassword = (password) => {
  if (!password) {
    return "A senha é obrigatória.";
  }

  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }

  return "";
};

const Register = ({ onRegister, onSwitchAuthModal }) => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setServerError("");

    if (name === "name") {
      setErrors((prev) => ({
        ...prev,
        name: value.trim() ? "" : "O nome é obrigatório.",
      }));
    }

    if (name === "email") {
      setErrors((prev) => ({
        ...prev,
        email: value.trim() ? validateEmail(value) : "",
      }));
    }

    if (name === "password") {
      setErrors((prev) => ({
        ...prev,
        password: value ? validatePassword(value) : "",
      }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]:
        name === "name"
          ? value.trim()
            ? ""
            : "O nome é obrigatório."
          : name === "email"
            ? validateEmail(value)
            : validatePassword(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {
      name: data.name.trim() ? "" : "O nome é obrigatório.",
      email: validateEmail(data.email),
      password: validatePassword(data.password),
    };

    setTouched({
      name: true,
      email: true,
      password: true,
    });

    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) {
      return;
    }

    setServerError("");
    setIsSubmitting(true);

    onRegister(data)
      .then(() => {
        setIsRegistered(true);
      })
      .catch((err) => {
        setServerError(
          err.message ||
            "Não foi possível concluir o cadastro. Tente novamente.",
        );
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (isRegistered) {
    return (
      <div className="register">
        <p className="register__welcome">Cadastro realizado!</p>
        <p>Sua conta foi criada com sucesso.</p>
        <button
          type="button"
          className="register__login-link"
          onClick={() => onSwitchAuthModal("login")}
        >
          Fazer login
        </button>
      </div>
    );
  }

  return (
    <div className="register">
      <p className="register__welcome">Inscrever-se</p>

      <form className="register__form" onSubmit={handleSubmit} noValidate>
        <input
          id="name"
          name="name"
          placeholder="Nome"
          type="text"
          value={data.name}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="name"
          aria-invalid={Boolean(touched.name && errors.name)}
        />

        {touched.name && errors.name && (
          <p className="register__error">{errors.name}</p>
        )}

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
        />

        {touched.email && errors.email && (
          <p className="register__error">{errors.email}</p>
        )}

        <input
          id="password"
          name="password"
          placeholder="Senha"
          type="password"
          value={data.password}
          onChange={handleChange}
          onBlur={handleBlur}
          autoComplete="new-password"
          aria-invalid={Boolean(touched.password && errors.password)}
        />

        {touched.password && errors.password && (
          <p className="register__error">{errors.password}</p>
        )}

        {serverError && (
          <p className="register__error" role="alert">
            {serverError}
          </p>
        )}

        <div className="register__button-container">
          <button
            type="submit"
            className="register__link"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Cadastrando..." : "Inscrever-se"}
          </button>
        </div>
      </form>

      <div className="register__signin">
        <button
          type="button"
          className="register__login-link"
          onClick={() => onSwitchAuthModal("login")}
        >
          Já é um membro? Faça o login aqui!
        </button>
      </div>
    </div>
  );
};

export default Register;
