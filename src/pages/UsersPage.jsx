import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import SortableTable from "../components/SortableTable";
import useUsers from "../hooks/useUsers";
import { Image, Button } from "react-bootstrap";
import useMakeAdmin from "../hooks/useMakeAdmin";

const UsersPage = () => {
	const { data } = useUsers();

	const makeAdmin = async (tableProps) => {
		useMakeAdmin(tableProps.row.original.id);
	};

	const columns = useMemo(() => {
		return [
			{
				Header: "Photo",
				accessor: "photoURL",
				sortType: (a) => {
					if (!a.original.photoURL) {
						return 1;
					} else {
						return -1;
					}
				},
				Cell: (tableProps) => (
					<Image
						src={
							tableProps.row.original.photoURL ||
							"https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-scaled.jpeg"
						}
						width={60}
						roundedCircle
					/>
				),
			},
			{
				Header: "Userame",
				accessor: "name",
			},
			{
				Header: "E-mail",
				accessor: "email",
			},
			{
				accessor: "isAdmin",
				sortType: (a) => {
					if (!a.original.isAdmin) {
						return 1;
					} else {
						return -1;
					}
				},
				Cell: (tableProps) =>
					!tableProps.row.original.isAdmin ? (
						<Button
							className="custom-button"
							onClick={() => {
								makeAdmin(tableProps);
							}}
						>
							{" "}
							Make Admin{" "}
						</Button>
					) : (
						<i>(admin)</i>
					),
			},
		];
	}, []);

	return (
		<Container className="py-3 table-responsive">
			{data && <SortableTable columns={columns} data={data} />}
		</Container>
	);
};

export default UsersPage;
