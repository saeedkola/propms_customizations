import frappe

from frappe import utils

@frappe.whitelist()
def make_brokerage_invoice(customer,amount):
    invoice = frappe.get_doc({
        "doctype" : "Sales Invoice",
        "customer": customer,
        "due_date": utils.today(),
        "items":[
            {
                "item_code": "Brokerage",                
                "rate": amount,
                "qty": 1
            }
        ]
    })

    invoice.save()
    return invoice
    
@frappe.whitelist()
def create_customer_from_lead(lead,first_name):
    customer = frappe.get_doc({
        "doctype": "Customer",
        "customer_name": first_name,
        "customer_type": "Individual",
        "from_lead": lead
    })

    customer.save()
    return customer