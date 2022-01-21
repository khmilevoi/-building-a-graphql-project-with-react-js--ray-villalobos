import { useQuery } from "../hooks";

type ViewerProps = {
  pageCount: number;
  after?: string;
};

export const useViewer = (props: ViewerProps) => {
  return useQuery(viewerQuery, props, mapper);
};

const mapper = (source: Source): Payload => ({
  name: source.viewer.name,
  repositoryCount: source.viewer.repositories.totalCount,
  repositories: source.viewer.repositories.edges.map((item) => ({
    cursor: item.cursor,
    ...item.node,
  })),
  pageInfo: source.viewer.repositories.pageInfo,
});

type Source = {
  viewer: {
    name: string;
    repositories: {
      totalCount: number;
      edges: Array<{
        cursor: string;
        node: {
          name: string;
          description?: string;
          id: string;
          url: string;
          viewerSubscription: SubscriptionState;
          licenseInfo: {
            spdxId: string;
          };
        };
      }>;
      pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string;
        endCursor: string;
      };
    };
  };
};

export type SubscriptionState = "IGNORED" | "SUBSCRIBED" | "UNSUBSCRIBED";

type Payload = {
  name: string;
  repositoryCount: number;
  repositories: Repository[];
  pageInfo: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string;
    endCursor: string;
  };
};

export type Repository = {
  name: string;
  description?: string;
  id: string;
  url: string;
  viewerSubscription: SubscriptionState;
  licenseInfo?: {
    spdxId: string;
  };
  cursor: string;
};

// language=GraphQL
const viewerQuery = `query ($pageCount: Int!, $cursor: String) {
    viewer {
        name
        repositories(first: $pageCount, orderBy: {field: UPDATED_AT, direction: DESC}, after: $cursor) {
            totalCount,
            edges {
                cursor
                node {
                    name
                    description
                    id
                    url
                    viewerSubscription
                    licenseInfo {
                        spdxId
                    }
                }
            }
            pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
            }
        }
    }
}
`;
