interface LoaderProps {}

export interface LoaderResponse {
  status: number;
  body: string;
}

export default async function loader(props: LoaderProps, req: Request): Promise<LoaderResponse> {
  return Promise.resolve({
    status: 200,
    body: "Hello World",
  });
}
