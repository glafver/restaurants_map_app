import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import userEvent from "@testing-library/user-event";
import ImageGrid from "../ImageGrid";

const photos = [
	{
		id: "1",
		url: "https://www.aluminati.net/wp-content/uploads/2016/03/img-placeholder.png",
	},
];

it("shows a modal when user clicks on image and closes when clicks outside", async () => {
	render(<ImageGrid photos={photos} />);

	const image = screen.getByTestId("grid-image");

	await userEvent.click(image);

	const modalImage = screen.getByRole("img");

	const modalDialog = screen.getByRole("dialog");

	await userEvent.click(modalDialog);

	expect(modalImage).not.toBeInTheDocument();
});
