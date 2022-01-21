import { config } from "../config";

export const query = <Params extends object, Source, Payload = Source>(
  queryString: string,
  params?: Params,
  mapper: Mapper<Source, Payload> = defaultMapper
) => {
  return fetch(config.baseURL, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ query: queryString, variables: params }),
  })
    .then((response) => response.json())
    .then(({ data, errors }) => {
      if (errors) {
        return Promise.reject(errors);
      }

      return mapper(data);
    });
};

export type Mapper<Source, Payload = Source> = (source: Source) => Payload;

const defaultMapper: Mapper<any> = (data) => data;
