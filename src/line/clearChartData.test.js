/**
 * @jest-environment jsdom
 */

const fs = require("fs")

require("@testing-library/jest-dom")
const domTesting = require("@testing-library/dom")
const {fireEvent} = require("@testing-library/dom")
const userEvent = require("@testing-library/user-event").default

const user = userEvent.setup()

function initDomFromFiles(htmlPath, jsPath) {
	const html = fs.readFileSync(htmlPath, 'utf8')
	document.open()
	document.write(html)
	document.close()
	jest.isolateModules(function () {
		require(jsPath)
	})
}

describe("Clearing chart data", function () {
	test("clears chart title", async function () {
		initDomFromFiles(
			`${__dirname}/line.html`,
			`${__dirname}/line.js`
		)
		// arrange
		const titleChart = domTesting.getByLabelText(document, 'Chart title')
		const clearButton = domTesting.getByText(document, 'Clear chart data')

		// act
		await user.type(titleChart, 'Line Chart')
		await user.click(clearButton)

		// assert
		expect(titleChart).toHaveValue("")
	})
	test("clears color selection", async function () {
		initDomFromFiles(
			`${__dirname}/line.html`,
			`${__dirname}/line.js`
		)
		// arrange
		const inputColor = document.getElementById('chart-color-input')
		const clearButton = domTesting.getByText(document, 'Clear chart data')

		// act
		await fireEvent.input(inputColor, {target: {value: '#333333'}}) //from piazza post -->https://github.com/testing-library/user-event/issues/423
		await user.click(clearButton)

		// assert
		expect(inputColor).toHaveValue("#ff4500")
	})
	test("clears x & y labels", async function () {
		initDomFromFiles(
			`${__dirname}/line.html`,
			`${__dirname}/line.js`
		)
		// arrange
		const xLabel = domTesting.getByLabelText(document, 'X label')
		const yLabel = domTesting.getByLabelText(document, 'Y label')
		const clearButton = domTesting.getByText(document, 'Clear chart data')

		// act
		await user.type(xLabel, 'Time')
		await user.type(yLabel, 'Volume')
		await user.click(clearButton)

		// assert
		expect(xLabel).toHaveValue("")
		expect(yLabel).toHaveValue("")
	})
	test("clears all x & y data points", async function () {
		initDomFromFiles(
			`${__dirname}/line.html`,
			`${__dirname}/line.js`
		)
		// arrange
		const addButton = domTesting.getByText(document, '+')
		await user.click(addButton)
		const xyInput = domTesting.queryAllByRole(document, 'spinbutton') //works
		const clearButton = domTesting.getByText(document, 'Clear chart data')

		// act
		await user.type(xyInput[0], '1')
		await user.type(xyInput[1], '2')
		
		expect(xyInput).toHaveLength(4)

		await user.type(xyInput[2], '3')
		await user.type(xyInput[3], '4')
		await user.click(clearButton)
		const xyInputUpdated = domTesting.queryAllByRole(document, 'spinbutton') // need to get xy inputs again after change

		// assert
		expect(xyInputUpdated).toHaveLength(2)
		expect(xyInputUpdated[0]).not.toHaveValue()
		expect(xyInputUpdated[1]).not.toHaveValue()
	})
})