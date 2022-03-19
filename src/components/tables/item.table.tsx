import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Tooltip,
    Th,
    Td,
    Box,
    ChakraProvider
} from "@chakra-ui/react";
import EditItem from "../modals/item.edit";
import RemoveItem from "../modals/item.delete";
import NewItem from "../modals/item.new";
import { useParams } from "react-router-dom";

function ItemList({ items, status, callback }: { items: any, status: any, callback: () => void }) {
    const [refreshTracker, setRefreshTracker] = useState(false);
    const param = useParams();
    useEffect(() => {
        callback()
    }, [refreshTracker]);

    return (
        <ChakraProvider>
            <Box>
                <Heading>ORDER ITEMS {Number.parseInt(status) == 0 ? <NewItem id={param.id + ""} callback={function (): void { setRefreshTracker(!refreshTracker) }} /> : <></>} </Heading>
                <Box overflowY="auto" maxHeight="500px">
                    <Table variant="striped" colorScheme="tomato">
                        <Thead position="sticky" top={0} bgColor="grey">
                            <Tr color='white'>
                                <Th color='white'>Name</Th>
                                <Th color='white' isNumeric>Quantity</Th>
                                <Th color='white' isNumeric>Unit Price</Th>
                                {Number.parseInt(status) == 0 ? <Th color='white' isNumeric>Actions</Th> : <></>}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {items.map((element: any) => {
                                return (
                                    <Tooltip title={element.description}>

                                        <Tr>
                                            <Td >{element.name}</Td>
                                            <Td isNumeric>{element.units || 1}</Td>
                                            <Td isNumeric>{element.price}.00</Td>
                                            {Number.parseInt(status) === 0 ? <Td isNumeric>
                                                <EditItem id={element._id} callback={function (): void { }} />
                                                <RemoveItem id={element._id} name={element.name} price={element.price.price} callback={function (): void { callback() }} />
                                            </Td> : <></>}
                                        </Tr>
                                    </Tooltip>
                                );
                            })}
                        </Tbody>
                    </Table>
                </Box>
            </Box>
        </ChakraProvider>
    );
}

export default ItemList;