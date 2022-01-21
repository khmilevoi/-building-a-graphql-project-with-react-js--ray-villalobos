import * as React from "react";
import * as ReactDOM from "react-dom";

import { Mapper, query } from "../utils";

export const useQuery = <Params extends object, Source, Payload = Source>(
  queryString: string,
  params: Params,
  mapper?: Mapper<Source, Payload>
) => {
  const [data, setData] = React.useState<Payload | null>(null);
  const [error, setError] = React.useState<unknown | null>(null);

  const memoizedParams = React.useMemo(() => {
    return params;
  }, [...Object.values(params)]);

  React.useEffect(() => {
    query(queryString, memoizedParams, mapper)
      .then((data) => {
        ReactDOM.unstable_batchedUpdates(() => {
          setData(data);
          setError(null);
        });
      })
      .catch((error) => {
        setError(error);
      });
  }, [queryString, mapper, memoizedParams]);

  return { data, error };
};
