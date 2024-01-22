const createReservation = async (jwt: string) => {
  return await fetch('http://reservations:3000/reservations', {
    method: 'POST',
    body: JSON.stringify({
      startDate: '01-04-2024',
      endDate: '08-04-2024',
      placeId: '1234',
      invoiceId: '93',
      charge: {
        amount: 50,
        card: {
          cvc: '413',
          exp_month: 12,
          exp_year: 2027,
          number: '4242 4242 4242 4242',
        },
      },
    }),
    headers: {
      'Content-Type': 'application/json',
      Authentication: jwt,
    },
  });
};

const getReservations = async (jwt: string) => {
  return await fetch('http://reservations:3000/reservations', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: jwt,
    },
  });
};

const getSingleReservation = async (jwt: string, id: number) => {
  return await fetch(`http://reservations:3000/reservations/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authentication: jwt,
    },
  });
};

describe('Reservations', () => {
  let jwt: string;

  beforeAll(async () => {
    const credentials = {
      email: 'sleeprapplication@gmail.com',
      password: 'StrongPassword123',
    };

    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    jwt = await response.text();
  });

  it('should create a new reservation', async () => {
    const response = await createReservation(jwt);

    expect(response.ok).toBeTruthy();
  });

  it('should get all reservations', async () => {
    const creationResponse = await createReservation(jwt);
    const reservation = await creationResponse.json();

    const readingResponse = await getReservations(jwt);
    const reservations = await readingResponse.json();

    expect(readingResponse.ok).toBeTruthy();
    expect(reservations).toEqual([reservation]);
  });

  it('should get an individual reservation', async () => {
    const creationResponse = await createReservation(jwt);
    const reservation = await creationResponse.json();

    const readingResponse = await getSingleReservation(jwt, reservation._id);
    const singleReservation = await readingResponse.json();

    expect(readingResponse.ok).toBeTruthy();
    expect(singleReservation).toEqual(reservation);
  });
});
