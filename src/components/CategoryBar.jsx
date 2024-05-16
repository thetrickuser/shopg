import ListGroup from "react-bootstrap/ListGroup";

const CategoryBar = () => {
  return (
    <ListGroup horizontal className="d-flex justify-content-around fs-4 bg-dark">
      <ListGroup.Item className="border-0 bg-dark text-white">All</ListGroup.Item>
      <ListGroup.Item className="border-0 bg-dark text-white">Mobiles</ListGroup.Item>
      <ListGroup.Item className="border-0 bg-dark text-white">Computers</ListGroup.Item>
      <ListGroup.Item className="border-0 bg-dark text-white">Speakers</ListGroup.Item>
      <ListGroup.Item className="border-0 bg-dark text-white">TV</ListGroup.Item>
      <ListGroup.Item className="border-0 bg-dark text-white">Cameras</ListGroup.Item>
      <ListGroup.Item className="border-0 bg-dark text-white">Wearables</ListGroup.Item>
      <ListGroup.Item className="border-0 bg-dark text-white">Electronics</ListGroup.Item>
    </ListGroup>
  );
};

export default CategoryBar;
