export default function generateApplicationId() {

  const random =
    Math.floor(
      1000 +
        Math.random() * 9000
    );

  return `AUS-${Date.now()}-${random}`;
}