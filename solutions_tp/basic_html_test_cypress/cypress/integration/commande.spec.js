//NB: il faut préalablement lancer lite-server dans le répertoire
//comportant index.html pour démarrer lite-server dont l'URL
//est http://localhost:3000 par defaut

describe('commande Tests', () => {
  it('bon ajout sur commande', () => {
    
	//partir de index.html
	cy.visit("http://localhost:3000/index.html")
	
	//cliquer sur le lien comportant 'commande'
	cy.contains('commande').click()
	cy.wait(50)
	// Should be on a new URL which includes '/commande'
    cy.url().should('include', '/commande')
	
	cy.get('#selProd').select('stylo').should('have.value', 'p2')
	// Get an input, type data into it 
	//and verify that the value has been updated
    cy.get('#qte').clear().type('3')
      .should('have.value', '3')
	  
	//declencher click sur bouton addition
	cy.get('#btnAdd').click()
	
	cy.get('#bodyTableau td:nth-child(2)')
	   .should('have.text','p2')
	   
	cy.get('#bodyTableau td:nth-child(3)')
	   .should('have.text','stylo')

	cy.get('#bodyTableau td:nth-child(5)')
	   .should('have.text','3') //qte valant bien 3
  })
  
  
})
