export interface IPersonDto {
  id: number;
  name: string;
  age: number;
}

export const getPerson = async (): Promise<IPersonDto> => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    id: 4,
    name: "John Doe",
    age: 42
  };
};
