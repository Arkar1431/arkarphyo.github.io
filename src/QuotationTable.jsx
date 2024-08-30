import { Container, Button, Table } from "react-bootstrap";
import { CiShoppingCart } from "react-icons/ci";
import { MdClear } from "react-icons/md";
import { BsFillTrashFill } from "react-icons/bs";

import style from "./mystyle.module.css";

function QuotationTable({ data, clearDataItems, deleteByIndex }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <h1>Quotation</h1>
        <p><CiShoppingCart /> No items</p>
      </Container>
    );
  }

  // Aggregate data items by item name
  const aggregatedData = data.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.item === item.item);
    if (existingItem) {
      existingItem.qty += parseInt(item.qty);
      existingItem.discount = item.discount; // Use the latest discount
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  const total = aggregatedData.reduce((acc, v) => {
    const amount = v.qty * v.ppu;
    const discount = parseInt(v.discount) || 0;
    const discountedAmount = Math.max(amount - discount, 0); // Ensure amount doesn't go negative
    return acc + discountedAmount;
  }, 0);

  const clearTable = () => {
    clearDataItems();
  };

  const handleDelete = (index) => {
    deleteByIndex(index);
  };

  return (
    <Container>
      <h1>Quotation</h1>
      <Button onClick={clearTable} variant="outline-dark">
        <MdClear /> Clear
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th className={style.textCenter}>-</th>
            <th className={style.textCenter}>Qty</th>
            <th className={style.textCenter}>Item</th>
            <th className={style.textCenter}>Price/Unit</th>
            <th className={style.textCenter}>Discount</th>
            <th className={style.textCenter}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {aggregatedData.map((v, i) => {
            const amount = v.qty * v.ppu;
            const discount = parseInt(v.discount) || 0;
            const discountedAmount = Math.max(amount - discount, 0); // Ensure amount doesn't go negative
            return (
              <tr key={i}>
                <td className={style.textCenter}>
                  <BsFillTrashFill onClick={() => handleDelete(i)} />
                </td>
                <td className={style.textCenter}>{v.qty}</td>
                <td>{v.item}</td>
                <td className={style.textCenter}>{v.ppu}</td>
                <td className={style.textCenter}>{discount}</td>
                <td className={style.textRight}>{discountedAmount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5} className={style.textRight}>
              Total
            </td>
            <td className={style.textRight}>{total.toFixed(2)}</td>
          </tr>
        </tfoot>
      </Table>
    </Container>
  );
}

export default QuotationTable;
