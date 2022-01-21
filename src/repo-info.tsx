import { Api } from "./modules";
import * as React from "react";
import classNames from "classnames";

type RepoInfoProps = { repository: Api.Queries.Repository };

export const RepoInfo: React.FC<RepoInfoProps> = ({ repository }) => {
  return (
    <li className={"list-group-item"}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex flex-column">
          <a
            className={"h5 mb-0 text-decoration-none"}
            target={"_blank"}
            href={repository.url}
            rel="noreferrer"
          >
            {repository.name}
          </a>
          <p className="small">{repository.description}</p>
        </div>

        <div className={"text-nowrap ms-3"}>
          <License license={repository.licenseInfo?.spdxId} />
          <button
            className={classNames(
              "px-1 py-0 ms-1 d-inline-block btn btn-sm",
              subscriptionColors[repository.viewerSubscription]
            )}
          >
            {repository.viewerSubscription}
          </button>
        </div>
      </div>
    </li>
  );
};

const subscriptionColors: { [color in Api.Queries.SubscriptionState]: string } =
  {
    SUBSCRIBED: "btn-success",
    IGNORED: "btn-outline-secondary",
    UNSUBSCRIBED: "btn-outline-secondary",
  };

type LicenseProps = { license?: string };

export const License: React.FC<LicenseProps> = ({ license }) => {
  switch (license) {
    case undefined:
      return (
        <button
          className={"px-1 py-0 ms-1 d-inline-block btn btn-sm btn-danger"}
        >
          NO LICENSE
        </button>
      );
    case "NOASSERTION":
      return (
        <button
          className={"px-1 py-0 ms-1 d-inline-block btn btn-sm btn-warning"}
        >
          {license}
        </button>
      );
    default:
      return (
        <button
          className={
            "px-1 py-0 ms-1 d-inline-block btn btn-sm btn-outline-success"
          }
        >
          {license}
        </button>
      );
  }
};
