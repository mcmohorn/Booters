terraform {
 backend "gcs" {
   bucket  = "d0842f777a7241f9-bucket-tfstate"
   prefix  = "terraform/state"
 }
}