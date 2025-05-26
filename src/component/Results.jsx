import { useEffect, useState } from 'react';
import calculateInvestmentResults, { formatter } from '../util/Investment';

export default function Results({ userInput }) {
    const [resultsData, setResultsData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // reset loading state when userInput changes
        const timer = setTimeout(() => {
            const calculatedResults = calculateInvestmentResults(userInput);
            setResultsData(calculatedResults);
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer); // clean up on unmount or prop change
    }, [userInput]);

    if (loading) {
        return <p className="center"><span className="loader"></span> Loading results...</p>;
    }

    const initialInvestment =
        resultsData[0].valueEndOfYear -
        resultsData[0].interest -
        resultsData[0].annualInvestment;

    return (
        <div id="result" className="table-wrapper">
            <table>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Investment Value</th>
                        <th>Interest (Year)</th>
                        <th>Total Interest</th>
                        <th>Invested Capital</th>
                    </tr>
                </thead>
                <tbody>
                    {resultsData.map((resultDataYear) => {
                        const totalInterest =
                            resultDataYear.valueEndOfYear -
                            resultDataYear.annualInvestment * resultDataYear.year -
                            initialInvestment;
                        const totalInvested = resultDataYear.valueEndOfYear - totalInterest;

                        return (
                            <tr key={resultDataYear.year}>
                                <td>{resultDataYear.year}</td>
                                <td>{formatter.format(resultDataYear.valueEndOfYear)}</td>
                                <td>{formatter.format(resultDataYear.interest)}</td>
                                <td>{formatter.format(totalInterest)}</td>
                                <td>{formatter.format(totalInvested)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
