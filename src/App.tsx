import * as React from "react";

import { Api } from "./modules";

import "./custom.scss";
import { RepoInfo } from "repo-info";

export const App = () => {
  const [pageCount, setPageCount] = React.useState(10);

  const { data: viewer, error } = Api.Queries.useViewer({ pageCount });

  console.log(viewer, error);

  return (
    <div className={"App container mt-5"}>
      <h1 className="text-primary">
        <i className="bi bi-diagram-2-fill" /> Repos
      </h1>
      <p>Hey there {viewer?.name}</p>

      <div className="d-flex align-items-center bg-light px-3 py-2 small rounded-3">
        <div className="d-flex align-items-center flex-grow-1">
          <label htmlFor="queryString" className="me-2 fw-bold text-secondary">
            Search
          </label>
          <input
            type="number"
            id="queryString"
            className="form-control form-control-sm me-2"
            value={pageCount}
            min={1}
            max={100}
            onChange={(event) =>
              setPageCount(Number.parseInt(event.currentTarget.value))
            }
          />
        </div>
        <div>
          <b className="me-2 text-secondary">Total:</b>
          {viewer?.repositoryCount}
        </div>
      </div>

      <ul className={"list-group list-group-flush"}>
        {viewer?.repositories.map((repository) => (
          <RepoInfo repository={repository} key={repository.id} />
        ))}
      </ul>
    </div>
  );
};
