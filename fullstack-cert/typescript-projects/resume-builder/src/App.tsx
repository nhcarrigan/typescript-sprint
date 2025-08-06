import { ChangeEvent, useState } from "react";
import "./App.css";
import { Field } from "./Field";

enum Focus {
  FULL_STACK = "Full Stack",
  FRONT_END = "Front End",
  BACK_END = "Back End",
}

enum Skills {
  TYPESCRIPT = "TypeScript",
  PYTHON = "Python",
  CSS = "CSS",
  REACT = "React",
  PHP = "PHP",
  DATABASES = "Databases",
  DOCKER = "Docker",
  GIT = "Git",
}

export function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [gradYear, setGradYear] = useState<number>(new Date().getFullYear());
  const [focus, setFocus] = useState<Focus>(Focus.FULL_STACK);

  function handleUpdateName(e: ChangeEvent) {
    setName((e.target as HTMLInputElement).value);
  }

  function handleUpdateEmail(e: ChangeEvent) {
    setEmail((e.target as HTMLInputElement).value);
  }

  function handleUpdatePhone(e: ChangeEvent) {
    setPhone((e.target as HTMLInputElement).value);
  }

  function handleUpdateObjective(e: ChangeEvent) {
    setObjective((e.target as HTMLInputElement).value);
  }

  function handleUpdateDegree(e: ChangeEvent) {
    setDegree((e.target as HTMLInputElement).value);
  }

  function handleUpdateGradYear(e: ChangeEvent) {
    const gradYear = parseInt((e.target as HTMLInputElement).value);
    const cutOffYear = 1976;
    if (Number.isSafeInteger(gradYear) && gradYear > cutOffYear) {
      setGradYear(parseInt((e.target as HTMLInputElement).value));
    } else {
      // TODO: add validation
    }
  }

  function handleUpdateFocus(e: ChangeEvent) {
    setFocus((e.target as HTMLInputElement).value as Focus);
  }

  return (
    <>
      <div className="content">
        <div>
          <h2>Personal Information</h2>
          <form>
            <div>
              <Field
                labelText={"Name: "}
                type={"text"}
                onChange={handleUpdateName}
              ></Field>
            </div>

            <div>
              <Field
                labelText={"Email: "}
                type={"email"}
                onChange={handleUpdateEmail}
              ></Field>
            </div>

            <div>
              <Field
                labelText={"Phone: "}
                type={"tel"}
                onChange={handleUpdatePhone}
              ></Field>
            </div>

            <div>
              <Field
                labelText={"Objective: "}
                type={"text"}
                onChange={handleUpdateObjective}
              ></Field>
            </div>

            <div>
              <Field
                labelText={"Degree "}
                type={"text"}
                onChange={handleUpdateDegree}
              ></Field>
            </div>

            <div>
              <Field
                labelText={"Graduation Year "}
                type={"number"}
                onChange={handleUpdateGradYear}
                value={gradYear}
              ></Field>
            </div>

            <div>
              <fieldset>
                <legend>Development Focus: </legend>
                <Field
                  labelText={Focus.FULL_STACK}
                  name={"focus"}
                  type={"radio"}
                  value={Focus.FULL_STACK}
                  checked={focus === Focus.FULL_STACK}
                  onChange={handleUpdateFocus}
                />
                <Field
                  labelText={Focus.FRONT_END}
                  name={"focus"}
                  type={"radio"}
                  value={Focus.FRONT_END}
                  checked={focus === Focus.FRONT_END}
                  onChange={handleUpdateFocus}
                />
                <Field
                  labelText={Focus.BACK_END}
                  name={"focus"}
                  type={"radio"}
                  value={Focus.BACK_END}
                  checked={focus === Focus.BACK_END}
                  onChange={handleUpdateFocus}
                />
              </fieldset>
            </div>
          </form>
        </div>
        <article>
          <h2>Resume</h2>
          <div>
            <label>Name: </label>
            <p id="name">{name}</p>
          </div>
          <div>
            <label>Email: </label>
            <p id="email">{email}</p>
          </div>
          <div>
            <label>Phone: </label>
            <p id="phone">{phone}</p>
          </div>
          <div>
            <label>Objective: </label>
            <p id="objective">{objective}</p>
          </div>
          <div>
            <label>Degree: </label>
            <p id="degree">{degree}</p>
          </div>
          <div>
            <label>Year: </label>
            <p id="gradYear">{gradYear}</p>
          </div>
          <div>
            <label>Development Focus: </label>
            <p id="focus">{focus}</p>
          </div>
        </article>
      </div>
    </>
  );
}
