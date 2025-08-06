import { ChangeEvent, useState, useEffect } from "react";
import "./App.css";
import { Field } from "./Field";
import { ResumeEntry } from "./ResumeEntry";

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

enum Experience {
  ENTRY_LEVEL = "Entry-level (0-2 years)",
  MID_LEVEL = "Mid-level (2-5 years)",
  SENIOR = "Senior (5+ years)",
}

const MIN_YEAR = 1976;
const MAX_YEAR = 2040;

const INVALID_YEAR_ERROR = `Invalid year`;
const YEAR_TOO_LOW_ERROR = `Year must be after ${MIN_YEAR}`;
const YEAR_TOO_HIGH_ERROR = `Year must be before ${MAX_YEAR}`;
const INVALID_PHONE_ERROR =
  "Phone number should only have digits, spaces, -, (, and )";
const INVALID_EMAIL_ERROR = "Email should be a correct form of a@b.c";

export function App() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [objective, setObjective] = useState<string>("");
  const [degree, setDegree] = useState<string>("");
  const [gradYear, setGradYear] = useState<number>(new Date().getFullYear());
  const [focus, setFocus] = useState<Focus>(Focus.FULL_STACK);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [errors, setErrors] = useState<string[]>([]);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(SaveStatus.READY);
  const [experience, setExperience] = useState<Experience>(
    Experience.ENTRY_LEVEL,
  );
  const [confidenceLevel, setConfidenceLevel] = useState<number>(5);
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split("T")[0],
  );

  // Non functional simulated saving
  useEffect(() => {
    setSaveStatus(SaveStatus.SAVING);
    const timer = setTimeout(() => {
      setSaveStatus(SaveStatus.SAVED);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [
    name,
    email,
    phone,
    objective,
    degree,
    gradYear,
    focus,
    skills,
    experience,
    confidenceLevel,
    startDate,
  ]);

  function updateErrors(error: string, remove: boolean) {
    if (remove) {
      setErrors((prev) => prev.filter((e) => e !== error));
    } else {
      setErrors((prev) => (prev.includes(error) ? prev : [...prev, error]));
    }
  }

  function handleUpdateName(e: ChangeEvent) {
    setName((e.target as HTMLInputElement).value);
  }

  function handleUpdateEmail(e: ChangeEvent) {
    const newEmail = (e.target as HTMLInputElement).value;
    setEmail(newEmail);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    updateErrors(INVALID_EMAIL_ERROR, emailRegex.test(newEmail));
  }

  function handleUpdatePhone(e: ChangeEvent) {
    const newPhone = (e.target as HTMLInputElement).value;
    setPhone(newPhone);
    const phoneRegex = /^[0-9\s-()]*$/;
    updateErrors(INVALID_PHONE_ERROR, phoneRegex.test(newPhone));
  }

  function handleUpdateObjective(e: ChangeEvent) {
    setObjective((e.target as HTMLInputElement).value);
  }

  function handleUpdateDegree(e: ChangeEvent) {
    setDegree((e.target as HTMLInputElement).value);
  }

  function handleUpdateGradYear(e: ChangeEvent) {
    const yearValue = (e.target as HTMLInputElement).value;
    const year = parseInt(yearValue);

    if (yearValue === "") {
      setGradYear(new Date().getFullYear());
      updateErrors(INVALID_YEAR_ERROR, true);
      updateErrors(YEAR_TOO_LOW_ERROR, true);
      updateErrors(YEAR_TOO_HIGH_ERROR, true);
      return;
    }

    setGradYear(year);

    const isSafe = Number.isSafeInteger(year);
    updateErrors(INVALID_YEAR_ERROR, isSafe);

    if (isSafe) {
      const isAfterMin = year >= MIN_YEAR;
      updateErrors(YEAR_TOO_LOW_ERROR, isAfterMin);
      const isBeforeMax = year <= MAX_YEAR;
      updateErrors(YEAR_TOO_HIGH_ERROR, isBeforeMax);
    } else {
      updateErrors(YEAR_TOO_LOW_ERROR, true);
      updateErrors(YEAR_TOO_HIGH_ERROR, true);
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

  function handleUpdateExperience(e: ChangeEvent<HTMLSelectElement>) {
    setExperience((e.target as HTMLSelectElement).value as Experience);
  }

  function handleUpdateConfidence(e: ChangeEvent) {
    setConfidenceLevel(parseInt((e.target as HTMLInputElement).value));
  }

  function handleUpdateStartDate(e: ChangeEvent) {
    setStartDate((e.target as HTMLInputElement).value);
  }

  return (
    <>
      <div className="content">
        <div>
          <h2>Personal Information</h2>
          <p>
            <em>{saveStatus}</em>
          </p>
          {errors.length > 0 && (
            <div className="error">
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
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
            </div>

            <div>
              <label>Years of Experience: </label>
              <select value={experience} onChange={handleUpdateExperience}>
                {Object.values(Experience).map((exp) => (
                  <option key={exp} value={exp}>
                    {exp}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Field
                labelText={`Confidence Level: ${confidenceLevel}`}
                type={"range"}
                min={1}
                max={10}
                value={confidenceLevel}
                onChange={handleUpdateConfidence}
              ></Field>
            </div>

            <div>
              <Field
                labelText={"Available Start Date: "}
                type={"date"}
                value={startDate}
                onChange={handleUpdateStartDate}
              ></Field>
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
            <ResumeEntry label="Name" value={name} />
          </div>
          <div>
            <ResumeEntry label="Email" value={email} />
          </div>
          <div>
            <ResumeEntry label="Phone" value={phone} />
          </div>
          <div>
            <ResumeEntry label="Objective" value={objective} />
          </div>
          <div>
            <ResumeEntry label="Degree" value={degree} />
          </div>
          <div>
            <ResumeEntry label="Graduation Year" value={gradYear} />
          </div>
          <div>
            <ResumeEntry label="Years of Experience" value={experience} />
          </div>
          <div>
            <ResumeEntry label="Confidence Level" value={confidenceLevel} />
          </div>
          <div>
            <ResumeEntry label="Available Start Date" value={startDate} />
          </div>
          <div>
            <ResumeEntry label="Development Focus" value={focus} />
          </div>
          <div>
            <ResumeEntry label="Skills" value={skills} />
          </div>
        </article>
      </div>
    </>
  );
}
