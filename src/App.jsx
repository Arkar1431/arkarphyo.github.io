import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    const itemCode = itemRef.current.value;
    const item = products.find((v) => v.code === itemCode);

    if (!item) return; // Handle case where item is not found

    const newItem = {
      item: item.name,
      ppu: ppuRef.current.value,
      qty: qtyRef.current.value,
      discount: discountRef.current.value,
    };

    // Aggregate existing items
    const existingItemIndex = dataItems.findIndex(
      (i) => i.item === item.name
    );

    if (existingItemIndex !== -1) {
      // Update quantity and discount of existing item
      const newDataItems = [...dataItems];
      newDataItems[existingItemIndex] = {
        ...newDataItems[existingItemIndex],
        qty: parseInt(newDataItems[existingItemIndex].qty) + parseInt(qtyRef.current.value),
        discount: discountRef.current.value,
      };
      setDataItems(newDataItems);
    } else {
      // Add new item
      setDataItems([...dataItems, newItem]);
    }
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    const newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    const itemCode = itemRef.current.value;
    const item = products.find((v) => v.code === itemCode);
    setPpu(item?.price || 0); // Handle case where item is not found
  };

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      discountRef.current.value = value;
    }
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(e.target.value)}
                readOnly
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                ref={qtyRef}
                defaultValue={1}
                min={1} // Prevent negative values
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                ref={discountRef}
                defaultValue={0}
                min={0} // Prevent negative values
                onChange={handleDiscountChange}
              />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
