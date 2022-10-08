export const getData = (query) => {
  const data = { ...query };

  if (data.title) {
    const str = query.title.split(' ');
    const regex = new RegExp([str[0]].join(''), 'i');
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.title = regex;
  }

  if (data.priceFrom || data.priceTo) {
    data.price =
      data.priceFrom && data.priceTo
        ? { $gte: +data.priceFrom, $lte: +data.priceTo }
        : data.priceFrom
        ? { $gte: +data.priceFrom }
        : { $lte: +data.priceTo };
    delete data.priceFrom;
    delete data.priceTo;
  }

  if (data.mileageFrom || data.mileageTo) {
    data.mileage =
      data.mileageFrom && data.mileageTo
        ? { $gte: +data.mileageFrom, $lte: +data.mileageTo }
        : data.mileageFrom
        ? { $gte: +data.mileageFrom }
        : { $lte: +data.mileageTo };
    delete data.mileageFrom;
    delete data.mileageTo;
  }

  if (data.yearFrom || data.yearTo) {
    data.year =
      data.yearFrom && data.yearTo
        ? { $gte: +data.yearFrom, $lte: +data.yearTo }
        : data.yearFrom
        ? { $gte: +data.yearFrom }
        : { $lte: +data.yearTo };
    delete data.yearFrom;
    delete data.yearTo;
  }

  return data;
};
