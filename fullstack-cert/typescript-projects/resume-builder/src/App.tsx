import { ChangeEvent, useState, useEffect } from "react";
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

enum SaveStatus {
  READY = "Ready",
  SAVING = "Saving...",
  SAVED = "All changes saved",
}

const MIN_YEAR = 1976;
const MAX_YEAR = 2040;

export function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [gradYear, setGradYear] = useState<number>(new Date().getFullYear());
  const [focus, setFocus] = useState<Focus>(Focus.FULL_STACK);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [gradYearError, setGradYearError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SaveStatus.READY);

  useEffect(() => {
    setSaveStatus(SaveStatus.SAVING);
    const timer = setTimeout(() => {
      setSaveStatus(SaveStatus.SAVED);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [name, email, phone, objective, degree, gradYear, focus, skills]);

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
    if (!Number.isSafeInteger(gradYear)) {
      setGradYearError(`Invalid year`);
    } else if (gradYear < MIN_YEAR) {
      setGradYearError(`Year must be after ${MIN_YEAR}`);
    } else if (gradYear > MAX_YEAR) {
      setGradYearError(`Year must be before ${MAX_YEAR}`);
    } else {
      setGradYearError(null);
      setGradYear(parseInt((e.target as HTMLInputElement).value));
    }
  }

  function handleUpdateFocus(e: ChangeEvent) {
    setFocus((e.target as HTMLInputElement).value as Focus);
  }

  function handleUpdateSkills(e: ChangeEvent) {
    const { value, checked } = e.target as HTMLInputElement;
    const skillValue = value as Skills;
    if (checked) {
      setSkills([...skills, skillValue]);
    } else {
      setSkills(skills.filter((skill) => skill !== skillValue));
    }
  }

  return (
    <>
      <div className="content">
        <div>
          <h2>Personal Information</h2>
          <p>
            <em>{saveStatus}</em>
          </p>
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
                labelText={"Degree: "}
                type={"text"}
                onChange={handleUpdateDegree}
              ></Field>
            </div>

            <div>
              <Field
                labelText={"Graduation Year: "}
                type={"number"}
                onChange={handleUpdateGradYear}
                value={gradYear}
              ></Field>
              {gradYearError && <p className="error">{gradYearError}</p>}
            </div>

            <div>
              <fieldset>
                <legend>Development Focus: </legend>
                {Object.values(Focus).map((focusValue) => (
                  <Field
                    key={focusValue}
                    labelText={focusValue}
                    name={"focus"}
                    type={"radio"}
                    value={focusValue}
                    checked={focus === focusValue}
                    onChange={handleUpdateFocus}
                  />
                ))}
              </fieldset>
            </div>
            <div>
              <fieldset>
                <legend>Skills: </legend>
                {Object.values(Skills).map((skillValue) => (
                  <Field
                    key={skillValue}
                    labelText={skillValue}
                    name={"skills"}
                    type={"checkbox"}
                    value={skillValue}
                    checked={skills.includes(skillValue)}
                    onChange={handleUpdateSkills}
                  />
                ))}
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
            <label>Graduation Year: </label>
            <p id="gradYear">{gradYear}</p>
          </div>
          <div>
            <label>Development Focus: </label>
            <p id="focus">{focus}</p>
          </div>
          <div>
            <label>Skills: </label>
            <p id="skills">{skills.join(", ")}</p>
          </div>
        </article>
      </div>
    </>
  );
}
