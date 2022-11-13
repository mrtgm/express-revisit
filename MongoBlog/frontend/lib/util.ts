const formatDate = (date: string) => {
  return new Date(date)
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
    .split('/')
    .join('-');
};

export const formatDateAdaptor = (data: string) => {
  return JSON.parse(data, (key, value) => {
    return ['createdAt', 'updatedAt'].includes(key) ? formatDate(value) : value;
  });
};
