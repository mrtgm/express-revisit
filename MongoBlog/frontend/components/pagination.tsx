import { HStack, Button } from '@chakra-ui/react';

type PaginationProps = {
  page: number;
  totalPages: number;
  onClickPagination: (page: number) => void;
};
export function Pagination({ page, totalPages, onClickPagination }: PaginationProps) {
  return (
    <HStack justifyContent="center" padding="10">
      {new Array(totalPages).fill(0).map((_, index) => {
        const p = index + 1;
        return (
          <Button isDisabled={page === p} colorScheme="blue" size="sm" onClick={() => onClickPagination(p)} key={index}>
            {p}
          </Button>
        );
      })}
    </HStack>
  );
}
