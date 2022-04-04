import Link from "next/link";
import { useState } from "react";

export default function BulmaMenu() {
  const [isActive, setActive] = useState("false");
  const ToggleClass = () => {
    setActive(!isActive);
  };
  return (
    <aside
      className="menu column is-one-quarter"
      style={{ "menu-item-active-color": "#fff" }}
    >
      <p className="menu-label ">General</p>
      <ul className="menu-list">
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Dashboard
          </a>
        </li>
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Customers
          </a>
        </li>
      </ul>
      <p className="menu-label">Administration</p>
      <ul className="menu-list">
        <li>
          <Link href="/accordion-updated">
            <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
              Team Settings
            </a>
          </Link>
        </li>
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Manage Your Team
          </a>
          <ul>
            <li>
              <a
                className={isActive ? "is-active" : null}
                onClick={ToggleClass}
              >
                Members
              </a>
            </li>
            <li>
              <a
                className={isActive ? "is-active" : null}
                onClick={ToggleClass}
              >
                Plugins
              </a>
            </li>
            <li>
              <a
                className={isActive ? "is-active" : null}
                onClick={ToggleClass}
              >
                Add a member
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Invitations
          </a>
        </li>
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Cloud Storage Environment Settings
          </a>
        </li>
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Authentication
          </a>
        </li>
      </ul>
      <p className="menu-label">Transactions</p>
      <ul className="menu-list">
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Payments
          </a>
        </li>
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Transfers
          </a>
        </li>
        <li>
          <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
            Balance
          </a>
        </li>
      </ul>
    </aside>
  );
}

// you need a map function for the list elements
// toggle class on multiple elements react
// https://stackoverflow.com/questions/47812067/toggle-class-on-multiple-elements-react

/*
const data = [
  { link: '', label: 'Notifications', icon: BellRinging },
  { link: '', label: 'Billing', icon: Receipt2 },
  { link: '', label: 'Security', icon: Fingerprint },
  { link: '', label: 'SSH Keys', icon: Key },
  { link: '', label: 'Databases', icon: DatabaseImport },
  { link: '', label: 'Authentication', icon: TwoFA },
  { link: '', label: 'Other Settings', icon: Settings },
];


data.map((item) => (
    <a
      className={cx(classes.link, { [classes.linkActive]: item.label === active })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}



      <a className={isActive ? "is-active" : null} onClick={ToggleClass}>
*/
