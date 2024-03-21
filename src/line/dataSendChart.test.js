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
    require(jsPath)
}

beforeEach(function() {
    jest.resetModules()
    jest.restoreAllMocks()
})

describe("Data correctly sent to chart generation", function () {
	test("data sent to generateChartImg", async function () {
		initDomFromFiles(
			`${__dirname}/line.html`,
			`${__dirname}/line.js`
		)
		//spy
		jest.mock("../lib/generateChartImg.js")
	    const generateChartImgSpy = require("../lib/generateChartImg")
	    generateChartImgSpy.mockImplementation(function() {
	        return "http://placekitten.com/480/480"
	    })

	    //arrange
        const titleChart = domTesting.getByLabelText(document, 'Chart title')
        const inputColor = document.getElementById('chart-color-input')
		const xLabel = domTesting.getByLabelText(document, 'X label')
		const yLabel = domTesting.getByLabelText(document, 'Y label')
		const xyInput = domTesting.queryAllByRole(document, 'spinbutton') // works
		const genChart = domTesting.getByText(document, 'Generate chart')

		// act
		await user.type(titleChart, 'Line Chart')
		await fireEvent.input(inputColor, {target: {value: '#333333'}}) //from piazza post --> https://github.com/testing-library/user-event/issues/423		
		await user.type(xLabel, 'Time')
		await user.type(yLabel, 'Volume')	
		await user.type(xyInput[0], '22')
		await user.type(xyInput[1], '33')
		await user.click(genChart)

        // assert
        expect(generateChartImgSpy).toHaveBeenCalled();
        expect(generateChartImgSpy).toHaveBeenCalledWith(
            	'line',
            	[{"x": "22", "y": "33"}],
            	"Time",
                'Volume',
                "Line Chart",
                "#333333"
        );

        // Cleanup
        generateChartImgSpy.mockRestore();
	})
})