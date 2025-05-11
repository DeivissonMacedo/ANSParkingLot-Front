import React, { useEffect, useRef, useState } from 'react';
import { FaCar, FaPlus } from 'react-icons/fa';
import VehicleModal from '../modals/VehicleModal';
import styles from './EmployeeTable.module.css';

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [searchedEmployee, setSearchedEmployee] = useState(null);
  const [searchedSpot, setSearchedSpot] = useState(null);

  const carouselRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:8080/employees')
      .then(res => res.json())
      .then(data => setEmployees(data));
  }, []);

  useEffect(() => {
    const carousels = document.querySelectorAll(`.${styles.carousel}`);
    const listeners = [];
  
    carousels.forEach((carousel) => {
      let isDown = false;
      let startX;
      let scrollLeft;
  
      const mouseDown = (e) => {
        isDown = true;
        carousel.classList.add(styles.dragging);
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      };
  
      const mouseLeave = () => {
        isDown = false;
        carousel.classList.remove(styles.dragging);
      };
  
      const mouseUp = () => {
        isDown = false;
        carousel.classList.remove(styles.dragging);
      };
  
      const mouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
      };
  
      carousel.addEventListener('mousedown', mouseDown);
      carousel.addEventListener('mouseleave', mouseLeave);
      carousel.addEventListener('mouseup', mouseUp);
      carousel.addEventListener('mousemove', mouseMove);
  
      listeners.push({ carousel, mouseDown, mouseLeave, mouseUp, mouseMove });
    });
  
    // Cleanup
    return () => {
      listeners.forEach(({ carousel, mouseDown, mouseLeave, mouseUp, mouseMove }) => {
        carousel.removeEventListener('mousedown', mouseDown);
        carousel.removeEventListener('mouseleave', mouseLeave);
        carousel.removeEventListener('mouseup', mouseUp);
        carousel.removeEventListener('mousemove', mouseMove);
      });
    };
  }, [employees]);

  const openModal = (employee) => {
    setSelectedEmployee(employee);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmployee(null);
    setModalOpen(false);
  };

  const handleAddCar = async ({ licensePlate, brand, model, color, employeeRegistrationNumber }) => {
    const res = await fetch('http://localhost:8080/vehicles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licensePlate,
        brand,
        model,
        color,
        employeeRegistrationNumber,
      })
    });

    if (res.ok) {
      alert('Veículo cadastrado com sucesso!');
      closeModal();
      fetch('http://localhost:8080/employees')
        .then(res => res.json())
        .then(data => setEmployees(data));
    } else {
      alert('Erro ao cadastrar veículo');
    }
  };

const handleSearch = () => {
  if (!searchInput) return;

  fetch(`http://localhost:8080/employees/${searchInput}`)
    .then(res => {
      if (!res.ok) throw new Error('Funcionário não encontrado');
      return res.json();
    })
    .then(data => {
      setSearchedEmployee(data);
      handleSearchSpot();  // Chama a função de busca de vaga depois de encontrar o funcionário
    })
    .catch(err => {
      setSearchedEmployee(null);
      alert(err.message);
    });
};

const handleSearchSpot = () => {
  fetch(`http://localhost:8080/parking-spot/employee/${searchInput}`)
    .then(res => {
      if (!res.ok) throw new Error('Vaga não encontrada');
      return res.json();
    })
    .then(data => setSearchedSpot(data))
    .catch(err => {
      setSearchedSpot(null);
      console.log(err.message);
    });
};


  

  const groupEmployees = (list, groupSize) => {
    const groups = [];
    for (let i = 0; i < list.length; i += groupSize) {
      groups.push(list.slice(i, i + groupSize));
    }
    return groups;
  };

  const employeeGroups = groupEmployees(employees, 10);

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Funcionários</h1>

      {/* Barra de pesquisa */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Digite a matrícula"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className={styles.input}
        />
        <button
          onClick={handleSearch}
          className={styles.button}
        >
          Buscar
        </button>
      </div>

      {/* Card de funcionário buscado */}
      {searchedEmployee && (
        <div className={styles.foundCard}>
          <h2>Funcionário encontrado</h2>
          <p><strong>Nome:</strong> {searchedEmployee.name}</p>
          <p><strong>Matrícula:</strong> {searchedEmployee.employeeRegistrationNumber}</p>
          <p><strong>Email:</strong> {searchedEmployee.email}</p>
          <p><strong>Celular:</strong> {searchedEmployee.cellphone}</p>
          {searchedSpot?(<><p><strong>Vaga:</strong> {searchedSpot.parkingSpotNumber}</p></>):(<><p>Funcionario sem vaga cadastrada</p></>)}
           <button onClick={() => openModal(searchedEmployee)} className={styles.cardButton}>  {searchedSpot ? <FaCar /> : <FaPlus />}</button>
        </div>
      )}

      {/* Carrossel de funcionários */}
      <div className={styles.mainContainer}>
        <button
          onClick={() => scroll('left')}
          className={styles.cardButton}
          style={{ fontSize: '24px', padding: '16px', borderRadius: '8px' }}
        >
          ◀
        </button>

        <div className={styles.carousel} ref={carouselRef}>
  {employees.map(emp => (
    <div key={emp.id} className={styles.card}>
      <h2>{emp.name}</h2>
      <p><strong>Matrícula:</strong> {emp.employeeRegistrationNumber}</p>
      <p><strong>Email:</strong> {emp.email}</p>
      <p><strong>Celular:</strong> {emp.cellphone}</p>
      <button onClick={() => openModal(emp)} className={styles.cardButton}>
        {emp.vehicle ? <FaCar /> : <FaPlus />}
      </button>
    </div>
  ))}
</div>


        <button
          onClick={() => scroll('right')}
          className={styles.cardButton}
          style={{ fontSize: '24px', padding: '16px', borderRadius: '8px' }}
        >
          ▶
        </button>
      </div>

      {/* Modal separado */}
      <VehicleModal
        isOpen={modalOpen}
        onClose={closeModal}
        employee={selectedEmployee}
        onAddCar={handleAddCar}
      />
    </div>
  );
};

export default EmployeeTable;
