// App.tsx
import React, { useState } from "react";
import "./index.css";

const sampleScenarios = [
  {
    label: "Basic Mortgage",
    loanAmount: 150000,
    interestRate: 3.5,
    term: 25,
  },
  {
    label: "Large Loan Amount",
    loanAmount: 500000,
    interestRate: 4.2,
    term: 30,
  },
  {
    label: "Shorter Term Loan",
    loanAmount: 200000,
    interestRate: 3.0,
    term: 15,
  },
  {
    label: "High Interest Rate",
    loanAmount: 120000,
    interestRate: 5.5,
    term: 20,
  },
  {
    label: "Low Loan Amount, Adjustable Rate",
    loanAmount: 75000,
    interestRate: 2.8,
    term: 10,
  },
];

const App: React.FC = () => {
  const [income, setIncome] = useState("");
  const [deposit, setDeposit] = useState("");
  const [interest, setInterest] = useState("");
  const [term, setTerm] = useState("25");
  const [monthlyPayment, setMonthlyPayment] = useState<number | null>(null);

  const calculateMortgage = () => {
    const principal = parseFloat(income) - parseFloat(deposit);
    const monthlyRate = parseFloat(interest) / 100 / 12;
    const months = parseInt(term) * 12;

    if (principal > 0 && monthlyRate > 0 && months > 0) {
      const payment =
        (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
      setMonthlyPayment(Math.round(payment));
    } else {
      setMonthlyPayment(null);
    }
  };

  const loadScenario = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = sampleScenarios.find((s) => s.label === e.target.value);
    if (selected) {
      setIncome((selected.loanAmount + 10000).toString());
      setDeposit("10000");
      setInterest(selected.interestRate.toString());
      setTerm(selected.term.toString());
      setMonthlyPayment(null);
    }
  };

  return (
    <div className="container">
      <h1>Mortgage Calculator</h1>

      <label>
        Load Sample Scenario
        <select onChange={loadScenario} defaultValue="">
          <option value="" disabled>
            Select a scenario
          </option>
          {sampleScenarios.map((scenario) => (
            <option key={scenario.label} value={scenario.label}>
              {scenario.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Total Property Price (£)
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
        />
      </label>
      <label>
        Deposit Amount (£)
        <input
          type="number"
          value={deposit}
          onChange={(e) => setDeposit(e.target.value)}
        />
      </label>
      <label>
        Interest Rate (%)
        <input
          type="number"
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
        />
      </label>
      <label>
        Term Length (years)
        <select value={term} onChange={(e) => setTerm(e.target.value)}>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
          <option value="25">25</option>
          <option value="30">30</option>
        </select>
      </label>
      <button onClick={calculateMortgage}>Calculate</button>

      {monthlyPayment !== null && (
        <div className="result">
          Estimated Monthly Payment: <strong>£{monthlyPayment}</strong>
        </div>
      )}
    </div>
  );
};

export default App;
