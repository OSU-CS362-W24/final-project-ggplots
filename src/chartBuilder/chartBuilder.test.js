/**
 * @jest-environment jsdom
 */

const fs = require("fs")
const domTesting = require("@testing-library/dom")
require('@testing-library/jest-dom')
const userEvent = require("@testing-library/user-event").default

function initDomFromFiles(htmlPath, jsPath) {
  const html = fs.readFileSync(htmlPath, 'utf8')
  document.open()
  document.write(html)
  document.close()
  jest.isolateModules(function() {
    require(jsPath)
  })
}

const runChartBuilder = require('./chartBuilder.js');

// resetting the page before each test
beforeEach(() => {
    localStorage.clear();
});

test('Adding values in the chart builder', async function () {
    initDomFromFiles(`${__dirname}/../line/line.html`, `${__dirname}/../line/line.js`)

    await runChartBuilder("line");

    // getting initial count of x and y input fields
    const initialXInputs = document.getElementsByClassName("x-value-input").length;
    const initialYInputs = document.getElementsByClassName("y-value-input").length;

    // typing example into x and y inputs
    const xInput = document.querySelector(".x-value-input");
    const yInput = document.querySelector(".y-value-input");
    await userEvent.type(xInput, '2');
    await userEvent.type(yInput, '11');

    // getting initial values of x and y inputs
    const initialXValues = Array.from(document.querySelectorAll(".x-value-input"))
                                .slice(0, initialXInputs)
                                .map(input => input.value);
    const initialYValues = Array.from(document.querySelectorAll(".y-value-input"))
                                .slice(0, initialYInputs)
                                .map(input => input.value);

    // clicking the add values button
    const addValuesBtn = document.getElementById("add-values-btn");
    await userEvent.click(addValuesBtn);

    // getting count of x and y value input fields after clicking button
    const newXInputs = document.getElementsByClassName("x-value-input").length;
    const newYInputs = document.getElementsByClassName("y-value-input").length;

    // verify that each input field has increased
    expect(newXInputs).toBe(initialXInputs + 2);
    expect(newYInputs).toBe(initialYInputs + 2);

    // getting values of x and y inputs after clicking the button
    const newXValues = Array.from(document.querySelectorAll(".x-value-input"))
                                .slice(0, initialXInputs) // excluding the newly added entries
                                .map(input => input.value);
    const newYValues = Array.from(document.querySelectorAll(".y-value-input"))
                                .slice(0, initialYInputs)
                                .map(input => input.value);

    // verify that the values remain the same after clicking the button
    expect(newXValues).toEqual(initialXValues);
    expect(newYValues).toEqual(initialYValues);

    // clicking it a second time
    await userEvent.click(addValuesBtn);

    const newXInputs2 = document.getElementsByClassName("x-value-input").length;
    const newYInputs2 = document.getElementsByClassName("y-value-input").length;

    expect(newXInputs2).toBe(newXInputs + 2);
    expect(newYInputs2).toBe(newYInputs + 2);
});

test('Alerts displayed for missing chart data', async function () {
    // initialize DOM
    initDomFromFiles(`${__dirname}/../line/line.html`, `${__dirname}/../line/line.js`)
  
    await runChartBuilder("line");

    // spying on the window alert
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    // clicking the generate chart button
    const generateChartBtn = document.getElementById('generate-chart-btn');
    await userEvent.click(generateChartBtn)

    // verify the alert was triggered
    expect(mockAlert).toHaveBeenCalledWith("Error: No data specified!")

    // clear mock
    mockAlert.mockClear()
});

test('Alerts displayed for missing chart labels', async function () {
    // initialize DOM
    initDomFromFiles(`${__dirname}/../line/line.html`, `${__dirname}/../line/line.js`)
  
    await runChartBuilder("line");

    // spying on the window alert
    const mockAlert = jest.spyOn(window, 'alert').mockImplementation(() => {})

    // typing into data entries
    const xInput = document.querySelector(".x-value-input");
    const yInput = document.querySelector(".y-value-input");
    await userEvent.type(xInput, '2');
    await userEvent.type(yInput, '11');

    // clicking the generate chart button
    const generateChartBtn = document.getElementById('generate-chart-btn');
    await userEvent.click(generateChartBtn)

    // verify the alert was triggered
    expect(mockAlert).toHaveBeenCalledWith("Error: Must specify a label for both X and Y!")

    // clear mock
    mockAlert.mockClear()
});