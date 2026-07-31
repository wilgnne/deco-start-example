export interface LoaderResponse {
  status: number;
  body: string;
}

export default async function loader(): Promise<LoaderResponse> {
  return Promise.resolve({
    status: 200,
    body: "Hello World",
  });
}
